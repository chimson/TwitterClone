import User from "../entity/User";
import { IResolvers } from "graphql-tools";
import { OwnContext } from "types";
import Conversation from "../entity/Conversation";
import Message from "../entity/Message";
import { pubsub } from "../index";
import { withFilter } from "graphql-subscriptions";
// delete directConversation, createConversation
export default {
  Query: {
    userConversations: async (_, {}, { authenticatedUser }: OwnContext) => {
      const user = await User.findById(authenticatedUser._id);
      const conversations = await Conversation.find({
        members: { $in: [user!.id] },
      }).populate("members");
      // query for any conversations that have user!.id in members array
      // on frontend, if acceptedInvitation array doesnt include my id
      // we display a prompt in message window accept/reject
      // if we reject ... $set acceptedInvitations to our id `13212kj124ko14-rejected'
      // if we accept we modify conversation and $set acceptedInvitations to include our id
      return conversations;
    },
    conversationMessages: async (_, { conversationId }) => {
      try {
        const messages = await Message.find({
          conversationId: { $eq: conversationId },
        });
        return messages;
      } catch (error) {
        throw new Error(error);
      }
    },
    directconversation: async (_, { conversationId }) => {
      try {
        const conversation = await Conversation.findById(
          conversationId
        ).populate("members");
        return conversation;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    acceptInvitation: async (
      _,
      { conversationId },
      { authenticatedUser }: OwnContext
    ) => {
      try {
        const conversation = await Conversation.find({
          conversationId: { $eq: conversationId },
        }).populate("members");
        if (
          conversation[0].members.some(
            (user) => user.id === authenticatedUser!._id
          )
        ) {
          if (
            conversation.length &&
            !conversation[0]!.acceptedInvitation.includes(
              authenticatedUser!._id
            )
          ) {
            return await Conversation.findOneAndUpdate(
              {
                conversationId: { $eq: conversationId },
              },
              {
                $set: {
                  acceptedInvitation: [
                    ...conversation[0]!.acceptedInvitation,
                    authenticatedUser._id,
                  ],
                },
              },
              { new: true }
            ).populate("members");
          } else {
            throw new Error(
              "Couldn't find the conversation between these users."
            );
          }
        } else {
          throw new Error("you weren't invited");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    messageUser: async (_, { userId }, { authenticatedUser }: OwnContext) => {
      try {
        const authUser = await User.findById(authenticatedUser._id);
        const userToBeMessaged = await User.findById(userId);
        const hasBeenMessaged = await Conversation.find({
          $or: [
            {
              conversationId: {
                $eq: `${authUser!.id}-${userToBeMessaged!.id}`,
              },
            },
            {
              conversationId: {
                $eq: `${userToBeMessaged!.id}-${authUser!.id}`,
              },
            },
          ],
        });

        if (hasBeenMessaged.length) {
          throw new Error("you already messaged this user.");
        } else {
          const conversation = await Conversation.create({
            members: [authUser, userToBeMessaged],
            type: "ONE_ON_ONE",
            acceptedInvitation: [authUser!.id],
            conversationId: `${authUser!.id}-${userToBeMessaged!.id}`,
          });
          await conversation.populate("members");
          return conversation;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      // creates a conversation type of one on one
      // it is sent by authenticated user to user with userId
      // the user has to accept Invitation by modyfing it acceptedInvitation array to include his id
    },
    createConversation: async (_, { userIds }) => {
      const type = userIds.length > 2 ? "GROUP_DM" : "ONE_ON_ONE";
      try {
        const users = await User.find({
          _id: { $in: userIds },
        });

        const newConversation = await Conversation.create({
          members: users,
          type,
        });

        return newConversation;
      } catch (error) {
        throw new Error(error);
      }
    },
    addPeopleToConversation: async (
      _,
      { userIds, conversationId },
      { authenticatedUser }: OwnContext
    ) => {
      try {
        if (conversationId) {
          const conversation = await Conversation.find({
            conversationId: conversationId,
          }).populate("members");
          if (conversation[0].type !== "ONE_TO_ONE") {
            throw new Error("this conversation is one on one only");
          } else {
            const users = await User.find({
              $and: [
                { _id: { $in: userIds } },
                { _id: { $nin: conversation![0].members } },
              ],
            });
            await Conversation.updateOne(
              {
                _id: { $eq: conversation[0]._id },
              },
              { $set: { members: [...conversation![0].members, ...users] } }
            );

            return conversation[0];
          }
        } else {
          const authUser = await User.findById(authenticatedUser._id);
          const users = await User.find({
            _id: { $in: userIds },
          });
          if (userIds.length === 1) {
            const alreadyExisting = await Conversation.find({
              members: { $in: userIds[0] },
              type: { $eq: "ONE_ON_ONE" },
            });
            if (alreadyExisting[0]) {
              throw new Error("this user has been messaged already");
            } else {
              const conversation = await (
                await Conversation.create({
                  members: [authUser, ...users],
                  type: "ONE_ON_ONE",
                  conversationId: `${authUser!.id}-${users[0].id}`,
                })
              ).populate("members");
              return conversation;
            }
          }
          const alreadyExisting = await Conversation.find({
            members: { $in: [authUser!.id, ...userIds] },
          });
          if (alreadyExisting[0]) {
            throw new Error("conversation already exists");
          }
          const conversation = await (
            await Conversation.create({
              members: [authUser, ...users],
              type: "GROUP_DM",
            })
          ).populate("members");

          return conversation;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    sendMessage: async (_, { text, conversationId, senderId }) => {
      try {
        const newMessage = await Message.create({
          conversationId,
          messagedata: { senderId, text: text },
        });

        if (newMessage && newMessage.id) {
          pubsub.publish("message_sent", {
            messageSent: {
              id: newMessage._id,
              conversationId: newMessage.conversationId,
              messagedata: newMessage.messagedata,
            },
          });
        }
        return newMessage;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("message_sent"),
        (payload, variables) => {
          return (
            payload.messageSent.conversationId === variables.conversationId
          );
        }
      ),
    },
  },
} as IResolvers;
