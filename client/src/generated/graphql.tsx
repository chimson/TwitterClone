import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']>;
  node?: Maybe<Node>;
  suggestedUsers?: Maybe<Array<User>>;
  authUser: User;
  userByName: UserByNameResult;
  randomUsers?: Maybe<Array<User>>;
  feed: FeedSuccess;
  conversation?: Maybe<Array<Post>>;
  post: PostByIdResult;
  replies?: Maybe<Array<Post>>;
  userPosts?: Maybe<Array<Post>>;
  likedPosts?: Maybe<Array<Post>>;
  postsAndReplies?: Maybe<Array<Post>>;
  userInbox?: Maybe<UserinboxResult>;
  conversationMessages?: Maybe<ConversationMessagesResult>;
  leftAt?: Maybe<LeftConversationAt>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUserByNameArgs = {
  username: Scalars['String'];
};


export type QueryRandomUsersArgs = {
  userId: Scalars['String'];
};


export type QueryFeedArgs = {
  offset?: Maybe<Scalars['Int']>;
};


export type QueryConversationArgs = {
  conversationId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type QueryPostArgs = {
  postId: Scalars['ID'];
};


export type QueryRepliesArgs = {
  postId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
  loadMoreId?: Maybe<Scalars['ID']>;
};


export type QueryUserPostsArgs = {
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryLikedPostsArgs = {
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryPostsAndRepliesArgs = {
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryConversationMessagesArgs = {
  conversationId: Scalars['String'];
  cursorId?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  leftAtMessageId?: Maybe<Scalars['String']>;
};


export type QueryLeftAtArgs = {
  userId: Scalars['String'];
  conversationId: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<User>>;
  followersCount?: Maybe<Scalars['Int']>;
  following?: Maybe<Array<User>>;
  followingCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isFollowed?: Maybe<Scalars['Boolean']>;
  lastReadMessageId?: Maybe<Scalars['String']>;
  lastSeenMessageId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type UserByNameResult = UserByNameSuccess | UserByNameInvalidInputError;

export type UserByNameSuccess = {
  __typename?: 'UserByNameSuccess';
  node: User;
};

export type UserByNameInvalidInputError = Error & {
  __typename?: 'UserByNameInvalidInputError';
  message: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type Error = {
  message: Scalars['String'];
};

export type FeedSuccess = {
  __typename?: 'FeedSuccess';
  feed?: Maybe<Array<Post>>;
  length?: Maybe<Scalars['Int']>;
};

export type Post = Node & {
  __typename?: 'Post';
  body: Scalars['String'];
  conversation?: Maybe<Array<Post>>;
  conversationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inReplyToId?: Maybe<Scalars['String']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Array<User>>;
  likesCount?: Maybe<Scalars['Int']>;
  owner?: Maybe<User>;
  replyCount?: Maybe<Scalars['Int']>;
};

export type PostByIdResult = PostByIdSuccess | PostByIdInvalidInputError;

export type PostByIdSuccess = {
  __typename?: 'PostByIdSuccess';
  node: Post;
};

export type PostByIdInvalidInputError = Error & {
  __typename?: 'PostByIdInvalidInputError';
  message: Scalars['String'];
  id: Scalars['ID'];
};

export type UserinboxResult = {
  __typename?: 'UserinboxResult';
  conversations?: Maybe<Array<Conversation>>;
  users?: Maybe<Array<User>>;
  lastSeenMessageId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  conversationId: Scalars['String'];
  lastReadMessageId?: Maybe<Scalars['String']>;
  mostRecentEntryId?: Maybe<Scalars['String']>;
  oldestEntryId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  messages_conversation?: Maybe<Array<Message>>;
  user?: Maybe<User>;
  participants?: Maybe<Array<Participants>>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  conversationId: Scalars['String'];
  messagedata: MessageData;
};

export type MessageData = {
  __typename?: 'MessageData';
  id: Scalars['ID'];
  text: Scalars['String'];
  conversationId: Scalars['String'];
  senderId: Scalars['String'];
  receiverId: Scalars['String'];
};

export type Participants = {
  __typename?: 'Participants';
  userId: Scalars['String'];
  lastReadMessageId?: Maybe<Scalars['String']>;
};

export type ConversationMessagesResult = {
  __typename?: 'ConversationMessagesResult';
  conversation: Conversation;
  hasNextPage: Scalars['Boolean'];
  messages?: Maybe<Array<Message>>;
  id: Scalars['ID'];
};

export type LeftConversationAt = {
  __typename?: 'LeftConversationAt';
  userId?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['String']>;
  leftAtMessageId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']>;
  login?: Maybe<UserLoginResult>;
  register: UserRegisterResult;
  logout?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<UserUpdateResult>;
  uploadAvatar?: Maybe<UpdateResourceResponse>;
  followUser?: Maybe<UpdateResourceResponse>;
  createPost?: Maybe<Post>;
  deletePost?: Maybe<DeleteResourceResponse>;
  likePost?: Maybe<UpdateResourceResponse>;
  loadMorePosts?: Maybe<Array<Post>>;
  updateLastSeenMessage?: Maybe<UnreadMessage>;
  readConversation?: Maybe<Conversation>;
  messageUser?: Maybe<Conversation>;
  sendMessage: SendMessageResult;
  leaveConversation?: Maybe<Conversation>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
  userId: Scalars['ID'];
};


export type MutationFollowUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  conversationId?: Maybe<Scalars['ID']>;
  inReplyToId?: Maybe<Scalars['ID']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationLoadMorePostsArgs = {
  postId: Scalars['ID'];
};


export type MutationUpdateLastSeenMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationReadConversationArgs = {
  conversationId: Scalars['String'];
  messageId: Scalars['String'];
};


export type MutationMessageUserArgs = {
  userId: Scalars['ID'];
};


export type MutationSendMessageArgs = {
  text: Scalars['String'];
  conversationId: Scalars['String'];
  senderId: Scalars['ID'];
  receiverId?: Maybe<Scalars['String']>;
};


export type MutationLeaveConversationArgs = {
  conversationId: Scalars['String'];
};

export type UserLoginResult = UserLoginSuccess | UserLoginInvalidInputError;

export type UserLoginSuccess = {
  __typename?: 'UserLoginSuccess';
  accessToken: Scalars['String'];
  node: User;
};

export type UserLoginInvalidInputError = Error & {
  __typename?: 'UserLoginInvalidInputError';
  message: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserRegisterResult = UserRegisterSuccess | UserRegisterInvalidInputError;

export type UserRegisterSuccess = {
  __typename?: 'UserRegisterSuccess';
  node: User;
};

export type UserRegisterInvalidInputError = Error & {
  __typename?: 'UserRegisterInvalidInputError';
  message: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateResult = UserUpdateSuccess | UserUpdateInvalidInputError;

export type UserUpdateSuccess = {
  __typename?: 'UserUpdateSuccess';
  node: User;
};

export type UserUpdateInvalidInputError = Error & {
  __typename?: 'UserUpdateInvalidInputError';
  message: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type UpdateResourceResponse = {
  __typename?: 'UpdateResourceResponse';
  node?: Maybe<Node>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteResourceResponse = {
  __typename?: 'DeleteResourceResponse';
  node?: Maybe<Node>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UnreadMessage = {
  __typename?: 'UnreadMessage';
  lastSeenMessageId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type SendMessageResult = {
  __typename?: 'SendMessageResult';
  message: Message;
  conversation?: Maybe<Conversation>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['String']>;
  conversationUpdated?: Maybe<ConversationUpdatedResult>;
};


export type SubscriptionConversationUpdatedArgs = {
  userId: Scalars['String'];
};

export type ConversationUpdatedResult = {
  __typename?: 'ConversationUpdatedResult';
  conversation?: Maybe<Conversation>;
  message?: Maybe<Message>;
  receiver?: Maybe<User>;
};

export enum Permission {
  OwnsAccount = 'ownsAccount',
  OwnsPost = 'ownsPost'
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "User",
      "Post"
    ],
    "UserByNameResult": [
      "UserByNameSuccess",
      "UserByNameInvalidInputError"
    ],
    "Error": [
      "UserByNameInvalidInputError",
      "PostByIdInvalidInputError",
      "UserLoginInvalidInputError",
      "UserRegisterInvalidInputError",
      "UserUpdateInvalidInputError"
    ],
    "PostByIdResult": [
      "PostByIdSuccess",
      "PostByIdInvalidInputError"
    ],
    "UserLoginResult": [
      "UserLoginSuccess",
      "UserLoginInvalidInputError"
    ],
    "UserRegisterResult": [
      "UserRegisterSuccess",
      "UserRegisterInvalidInputError"
    ],
    "UserUpdateResult": [
      "UserUpdateSuccess",
      "UserUpdateInvalidInputError"
    ]
  }
};
      export default result;
    
export type PostConversationFieldsFragment = (
  { __typename?: 'Post' }
  & { conversation?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body'>
  )>> }
);

export type PostLikesFieldsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'isLiked' | 'likesCount' | 'replyCount'>
  & { likes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>> }
);

export type UserAvatarFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'avatar'>
);

export type UserFollowerFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'isFollowed' | 'followersCount' | 'followingCount'>
  & { followers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & UserAvatarFieldsFragment
  )>> }
);

export type AuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUserQuery = (
  { __typename?: 'Query' }
  & { authUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'name' | 'bio' | 'website'>
    & UserFollowerFieldsFragment
    & UserAvatarFieldsFragment
  ) }
);

export type ConversationQueryVariables = Exact<{
  conversationId: Scalars['ID'];
  postId: Scalars['ID'];
}>;


export type ConversationQuery = (
  { __typename?: 'Query' }
  & { conversation?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
      & UserFollowerFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export type ConversationMessagesQueryVariables = Exact<{
  conversationId: Scalars['String'];
  cursorId?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  leftAtMessageId?: Maybe<Scalars['String']>;
}>;


export type ConversationMessagesQuery = (
  { __typename?: 'Query' }
  & { conversationMessages?: Maybe<(
    { __typename?: 'ConversationMessagesResult' }
    & Pick<ConversationMessagesResult, 'hasNextPage'>
    & { conversation: (
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'id' | 'conversationId' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
      & { messages_conversation?: Maybe<Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'conversationId' | 'id'>
        & { messagedata: (
          { __typename?: 'MessageData' }
          & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'id' | 'conversationId'>
        ) }
      )>>, participants?: Maybe<Array<(
        { __typename?: 'Participants' }
        & Pick<Participants, 'userId' | 'lastReadMessageId'>
      )>> }
    ), messages?: Maybe<Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'conversationId' | 'id'>
      & { messagedata: (
        { __typename?: 'MessageData' }
        & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'id' | 'conversationId'>
      ) }
    )>> }
  )> }
);

export type ConversationUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ConversationUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { conversationUpdated?: Maybe<(
    { __typename?: 'ConversationUpdatedResult' }
    & { conversation?: Maybe<(
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'id' | 'conversationId' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
      & { participants?: Maybe<Array<(
        { __typename?: 'Participants' }
        & Pick<Participants, 'userId' | 'lastReadMessageId'>
      )>>, messages_conversation?: Maybe<Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'conversationId' | 'id'>
        & { messagedata: (
          { __typename?: 'MessageData' }
          & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'conversationId' | 'id'>
        ) }
      )>> }
    )>, message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'conversationId'>
      & { messagedata: (
        { __typename?: 'MessageData' }
        & Pick<MessageData, 'text' | 'receiverId' | 'id' | 'conversationId' | 'senderId'>
      ) }
    )>, receiver?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  )> }
);

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  conversationId?: Maybe<Scalars['ID']>;
  inReplyToId?: Maybe<Scalars['ID']>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )> }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost?: Maybe<(
    { __typename?: 'DeleteResourceResponse' }
    & Pick<DeleteResourceResponse, 'status'>
  )> }
);

export type FeedQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
}>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: (
    { __typename?: 'FeedSuccess' }
    & Pick<FeedSuccess, 'length'>
    & { feed?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
      & { owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'name' | 'email'>
        & UserAvatarFieldsFragment
        & UserFollowerFieldsFragment
      )> }
      & PostLikesFieldsFragment
      & PostConversationFieldsFragment
    )>> }
  ) }
);

export type FollowUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & { followUser?: Maybe<(
    { __typename?: 'UpdateResourceResponse' }
    & { node?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & UserFollowerFieldsFragment
      & UserAvatarFieldsFragment
    ) | { __typename?: 'Post' }> }
  )> }
);

export type LoadMorePostsMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LoadMorePostsMutation = (
  { __typename?: 'Mutation' }
  & { loadMorePosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export type RandomUsersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type RandomUsersQuery = (
  { __typename?: 'Query' }
  & { randomUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name'>
    & UserAvatarFieldsFragment
    & UserFollowerFieldsFragment
  )>> }
);

export type UserByNameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByNameQuery = (
  { __typename?: 'Query' }
  & { userByName: (
    { __typename?: 'UserByNameSuccess' }
    & { node: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'name' | 'bio' | 'website'>
      & UserFollowerFieldsFragment
      & UserAvatarFieldsFragment
    ) }
  ) | (
    { __typename?: 'UserByNameInvalidInputError' }
    & Pick<UserByNameInvalidInputError, 'message' | 'username'>
  ) }
);

export type LeaveConversationMutationVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type LeaveConversationMutation = (
  { __typename?: 'Mutation' }
  & { leaveConversation?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'conversationId' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
    & { participants?: Maybe<Array<(
      { __typename?: 'Participants' }
      & Pick<Participants, 'userId' | 'lastReadMessageId'>
    )>> }
  )> }
);

export type LeftAtQueryVariables = Exact<{
  userId: Scalars['String'];
  conversationId: Scalars['String'];
}>;


export type LeftAtQuery = (
  { __typename?: 'Query' }
  & { leftAt?: Maybe<(
    { __typename?: 'LeftConversationAt' }
    & Pick<LeftConversationAt, 'userId' | 'conversationId' | 'leftAtMessageId'>
  )> }
);

export type LikePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost?: Maybe<(
    { __typename?: 'UpdateResourceResponse' }
    & { node?: Maybe<{ __typename?: 'User' } | (
      { __typename?: 'Post' }
      & PostLikesFieldsFragment
    )> }
  )> }
);

export type LikedPostsQueryVariables = Exact<{
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type LikedPostsQuery = (
  { __typename?: 'Query' }
  & { likedPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename: 'UserLoginSuccess' }
    & Pick<UserLoginSuccess, 'accessToken'>
    & { node: (
      { __typename: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'website' | 'name'>
      & UserAvatarFieldsFragment
      & UserFollowerFieldsFragment
    ) }
  ) | (
    { __typename: 'UserLoginInvalidInputError' }
    & Pick<UserLoginInvalidInputError, 'email' | 'password' | 'message'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MessageUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type MessageUserMutation = (
  { __typename?: 'Mutation' }
  & { messageUser?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'conversationId' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
    & { participants?: Maybe<Array<(
      { __typename?: 'Participants' }
      & Pick<Participants, 'userId' | 'lastReadMessageId'>
    )>>, messages_conversation?: Maybe<Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'conversationId' | 'id'>
      & { messagedata: (
        { __typename?: 'MessageData' }
        & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'conversationId' | 'id'>
      ) }
    )>> }
  )> }
);

export type PostQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'PostByIdSuccess' }
    & { node: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
      & { owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'name' | 'email'>
        & UserAvatarFieldsFragment
      )> }
      & PostLikesFieldsFragment
      & PostConversationFieldsFragment
    ) }
  ) | (
    { __typename?: 'PostByIdInvalidInputError' }
    & Pick<PostByIdInvalidInputError, 'message' | 'id'>
  ) }
);

export type PostsAndRepliesQueryVariables = Exact<{
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type PostsAndRepliesQuery = (
  { __typename?: 'Query' }
  & { postsAndReplies?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export type ReadConversationMutationVariables = Exact<{
  conversationId: Scalars['String'];
  messageId: Scalars['String'];
}>;


export type ReadConversationMutation = (
  { __typename?: 'Mutation' }
  & { readConversation?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'conversationId' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
    & { participants?: Maybe<Array<(
      { __typename?: 'Participants' }
      & Pick<Participants, 'userId' | 'lastReadMessageId'>
    )>> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename: 'UserRegisterSuccess' }
    & { node: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) | (
    { __typename: 'UserRegisterInvalidInputError' }
    & Pick<UserRegisterInvalidInputError, 'email' | 'username' | 'name' | 'password' | 'message'>
  ) }
);

export type RepliesQueryVariables = Exact<{
  postId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
  loadMoreId?: Maybe<Scalars['ID']>;
}>;


export type RepliesQuery = (
  { __typename?: 'Query' }
  & { replies?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
      & UserFollowerFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  conversationId: Scalars['String'];
  senderId: Scalars['ID'];
  receiverId: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'SendMessageResult' }
    & { message: (
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'conversationId'>
      & { messagedata: (
        { __typename?: 'MessageData' }
        & Pick<MessageData, 'text' | 'id' | 'receiverId' | 'conversationId' | 'senderId'>
      ) }
    ), conversation?: Maybe<(
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'conversationId' | 'id' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
      & { participants?: Maybe<Array<(
        { __typename?: 'Participants' }
        & Pick<Participants, 'userId' | 'lastReadMessageId'>
      )>>, messages_conversation?: Maybe<Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'conversationId' | 'id'>
        & { messagedata: (
          { __typename?: 'MessageData' }
          & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'conversationId' | 'id'>
        ) }
      )>> }
    )> }
  ) }
);

export type UpdateLastSeenMessageMutationVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type UpdateLastSeenMessageMutation = (
  { __typename?: 'Mutation' }
  & { updateLastSeenMessage?: Maybe<(
    { __typename?: 'UnreadMessage' }
    & Pick<UnreadMessage, 'userId' | 'lastSeenMessageId'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename: 'UserUpdateSuccess' }
    & { node: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'bio' | 'website'>
      & UserFollowerFieldsFragment
      & UserAvatarFieldsFragment
    ) }
  ) | (
    { __typename: 'UserUpdateInvalidInputError' }
    & Pick<UserUpdateInvalidInputError, 'name' | 'bio' | 'website' | 'message'>
  )> }
);

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
  userId: Scalars['ID'];
}>;


export type UploadAvatarMutation = (
  { __typename?: 'Mutation' }
  & { uploadAvatar?: Maybe<(
    { __typename?: 'UpdateResourceResponse' }
    & Pick<UpdateResourceResponse, 'status'>
    & { node?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username' | 'email'>
      & UserAvatarFieldsFragment
    ) | { __typename?: 'Post' }> }
  )> }
);

export type UserInboxQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInboxQuery = (
  { __typename?: 'Query' }
  & { userInbox?: Maybe<(
    { __typename?: 'UserinboxResult' }
    & Pick<UserinboxResult, 'userId' | 'lastSeenMessageId'>
    & { conversations?: Maybe<Array<(
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'conversationId' | 'id' | 'lastReadMessageId' | 'mostRecentEntryId' | 'oldestEntryId' | 'type'>
      & { participants?: Maybe<Array<(
        { __typename?: 'Participants' }
        & Pick<Participants, 'userId' | 'lastReadMessageId'>
      )>>, messages_conversation?: Maybe<Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'conversationId' | 'id'>
        & { messagedata: (
          { __typename?: 'MessageData' }
          & Pick<MessageData, 'text' | 'senderId' | 'receiverId' | 'conversationId' | 'id'>
        ) }
      )>> }
    )>>, users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    )>> }
  )> }
);

export type UserPostsQueryVariables = Exact<{
  userId: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type UserPostsQuery = (
  { __typename?: 'Query' }
  & { userPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'conversationId' | 'inReplyToId'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'email'>
      & UserAvatarFieldsFragment
    )> }
    & PostLikesFieldsFragment
    & PostConversationFieldsFragment
  )>> }
);

export const PostConversationFieldsFragmentDoc = gql`
    fragment postConversationFields on Post {
  conversation {
    id
    body
  }
}
    `;
export const PostLikesFieldsFragmentDoc = gql`
    fragment postLikesFields on Post {
  id
  isLiked @client
  likesCount
  replyCount
  likes {
    id
  }
}
    `;
export const UserAvatarFieldsFragmentDoc = gql`
    fragment userAvatarFields on User {
  avatar
}
    `;
export const UserFollowerFieldsFragmentDoc = gql`
    fragment userFollowerFields on User {
  isFollowed @client
  followersCount
  followingCount
  followers {
    id
    ...userAvatarFields
  }
}
    ${UserAvatarFieldsFragmentDoc}`;
export const AuthUserDocument = gql`
    query authUser {
  authUser {
    id
    username
    email
    name
    bio
    website
    ...userFollowerFields
    ...userAvatarFields
  }
}
    ${UserFollowerFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __useAuthUserQuery__
 *
 * To run a query within a React component, call `useAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, baseOptions);
      }
export function useAuthUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, baseOptions);
        }
export type AuthUserQueryHookResult = ReturnType<typeof useAuthUserQuery>;
export type AuthUserLazyQueryHookResult = ReturnType<typeof useAuthUserLazyQuery>;
export type AuthUserQueryResult = ApolloReactCommon.QueryResult<AuthUserQuery, AuthUserQueryVariables>;
export const ConversationDocument = gql`
    query conversation($conversationId: ID!, $postId: ID!) {
  conversation(conversationId: $conversationId, postId: $postId) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
      ...userFollowerFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}
${UserFollowerFieldsFragmentDoc}`;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useConversationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        return ApolloReactHooks.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
      }
export function useConversationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = ApolloReactCommon.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const ConversationMessagesDocument = gql`
    query conversationMessages($conversationId: String!, $cursorId: String, $limit: Int!, $leftAtMessageId: String) {
  conversationMessages(
    conversationId: $conversationId
    cursorId: $cursorId
    limit: $limit
    leftAtMessageId: $leftAtMessageId
  ) {
    hasNextPage
    conversation {
      id
      conversationId
      lastReadMessageId
      mostRecentEntryId
      oldestEntryId
      type
      messages_conversation {
        conversationId
        id
        messagedata {
          text
          senderId
          receiverId
          id
          conversationId
        }
      }
      participants {
        userId
        lastReadMessageId
      }
    }
    messages {
      conversationId
      id
      messagedata {
        text
        senderId
        receiverId
        id
        conversationId
      }
    }
  }
}
    `;

/**
 * __useConversationMessagesQuery__
 *
 * To run a query within a React component, call `useConversationMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      cursorId: // value for 'cursorId'
 *      limit: // value for 'limit'
 *      leftAtMessageId: // value for 'leftAtMessageId'
 *   },
 * });
 */
export function useConversationMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<ConversationMessagesQuery, ConversationMessagesQueryVariables>(ConversationMessagesDocument, baseOptions);
      }
export function useConversationMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ConversationMessagesQuery, ConversationMessagesQueryVariables>(ConversationMessagesDocument, baseOptions);
        }
export type ConversationMessagesQueryHookResult = ReturnType<typeof useConversationMessagesQuery>;
export type ConversationMessagesLazyQueryHookResult = ReturnType<typeof useConversationMessagesLazyQuery>;
export type ConversationMessagesQueryResult = ApolloReactCommon.QueryResult<ConversationMessagesQuery, ConversationMessagesQueryVariables>;
export const ConversationUpdatedDocument = gql`
    subscription conversationUpdated($userId: String!) {
  conversationUpdated(userId: $userId) {
    conversation {
      id
      conversationId
      lastReadMessageId
      mostRecentEntryId
      oldestEntryId
      type
      participants {
        userId
        lastReadMessageId
      }
      messages_conversation {
        conversationId
        id
        messagedata {
          text
          senderId
          receiverId
          conversationId
          id
        }
      }
    }
    message {
      id
      conversationId
      messagedata {
        text
        receiverId
        id
        conversationId
        senderId
      }
    }
    receiver {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useConversationUpdatedSubscription__
 *
 * To run a query within a React component, call `useConversationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useConversationUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>(ConversationUpdatedDocument, baseOptions);
      }
export type ConversationUpdatedSubscriptionHookResult = ReturnType<typeof useConversationUpdatedSubscription>;
export type ConversationUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<ConversationUpdatedSubscription>;
export const CreatePostDocument = gql`
    mutation createPost($body: String!, $conversationId: ID, $inReplyToId: ID) {
  createPost(
    body: $body
    inReplyToId: $inReplyToId
    conversationId: $conversationId
  ) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      conversationId: // value for 'conversationId'
 *      inReplyToId: // value for 'inReplyToId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    status
  }
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const FeedDocument = gql`
    query feed($offset: Int) {
  feed(offset: $offset) {
    feed {
      id
      body
      conversationId
      inReplyToId
      ...postLikesFields
      ...postConversationFields
      owner {
        id
        username
        name
        email
        ...userAvatarFields
        ...userFollowerFields
      }
    }
    length
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}
${UserFollowerFieldsFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
      }
export function useFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export const FollowUserDocument = gql`
    mutation followUser($id: ID!) {
  followUser(id: $id) {
    node {
      ... on User {
        id
        ...userFollowerFields
        ...userAvatarFields
      }
    }
  }
}
    ${UserFollowerFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;
export type FollowUserMutationFn = ApolloReactCommon.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, baseOptions);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = ApolloReactCommon.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LoadMorePostsDocument = gql`
    mutation loadMorePosts($postId: ID!) {
  loadMorePosts(postId: $postId) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;
export type LoadMorePostsMutationFn = ApolloReactCommon.MutationFunction<LoadMorePostsMutation, LoadMorePostsMutationVariables>;

/**
 * __useLoadMorePostsMutation__
 *
 * To run a mutation, you first call `useLoadMorePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoadMorePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loadMorePostsMutation, { data, loading, error }] = useLoadMorePostsMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLoadMorePostsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoadMorePostsMutation, LoadMorePostsMutationVariables>) {
        return ApolloReactHooks.useMutation<LoadMorePostsMutation, LoadMorePostsMutationVariables>(LoadMorePostsDocument, baseOptions);
      }
export type LoadMorePostsMutationHookResult = ReturnType<typeof useLoadMorePostsMutation>;
export type LoadMorePostsMutationResult = ApolloReactCommon.MutationResult<LoadMorePostsMutation>;
export type LoadMorePostsMutationOptions = ApolloReactCommon.BaseMutationOptions<LoadMorePostsMutation, LoadMorePostsMutationVariables>;
export const RandomUsersDocument = gql`
    query randomUsers($userId: String!) {
  randomUsers(userId: $userId) {
    id
    username
    name
    ...userAvatarFields
    ...userFollowerFields
  }
}
    ${UserAvatarFieldsFragmentDoc}
${UserFollowerFieldsFragmentDoc}`;

/**
 * __useRandomUsersQuery__
 *
 * To run a query within a React component, call `useRandomUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomUsersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRandomUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RandomUsersQuery, RandomUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<RandomUsersQuery, RandomUsersQueryVariables>(RandomUsersDocument, baseOptions);
      }
export function useRandomUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RandomUsersQuery, RandomUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RandomUsersQuery, RandomUsersQueryVariables>(RandomUsersDocument, baseOptions);
        }
export type RandomUsersQueryHookResult = ReturnType<typeof useRandomUsersQuery>;
export type RandomUsersLazyQueryHookResult = ReturnType<typeof useRandomUsersLazyQuery>;
export type RandomUsersQueryResult = ApolloReactCommon.QueryResult<RandomUsersQuery, RandomUsersQueryVariables>;
export const UserByNameDocument = gql`
    query userByName($username: String!) {
  userByName(username: $username) {
    ... on UserByNameSuccess {
      node {
        ... on User {
          id
          email
          username
          name
          bio
          website
          ...userFollowerFields
          ...userAvatarFields
        }
      }
    }
    ... on UserByNameInvalidInputError {
      message
      username
    }
  }
}
    ${UserFollowerFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __useUserByNameQuery__
 *
 * To run a query within a React component, call `useUserByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByNameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserByNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByNameQuery, UserByNameQueryVariables>) {
        return ApolloReactHooks.useQuery<UserByNameQuery, UserByNameQueryVariables>(UserByNameDocument, baseOptions);
      }
export function useUserByNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByNameQuery, UserByNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserByNameQuery, UserByNameQueryVariables>(UserByNameDocument, baseOptions);
        }
export type UserByNameQueryHookResult = ReturnType<typeof useUserByNameQuery>;
export type UserByNameLazyQueryHookResult = ReturnType<typeof useUserByNameLazyQuery>;
export type UserByNameQueryResult = ApolloReactCommon.QueryResult<UserByNameQuery, UserByNameQueryVariables>;
export const LeaveConversationDocument = gql`
    mutation leaveConversation($conversationId: String!) {
  leaveConversation(conversationId: $conversationId) {
    id
    conversationId
    lastReadMessageId
    mostRecentEntryId
    oldestEntryId
    type
    participants {
      userId
      lastReadMessageId
    }
  }
}
    `;
export type LeaveConversationMutationFn = ApolloReactCommon.MutationFunction<LeaveConversationMutation, LeaveConversationMutationVariables>;

/**
 * __useLeaveConversationMutation__
 *
 * To run a mutation, you first call `useLeaveConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveConversationMutation, { data, loading, error }] = useLeaveConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useLeaveConversationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveConversationMutation, LeaveConversationMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveConversationMutation, LeaveConversationMutationVariables>(LeaveConversationDocument, baseOptions);
      }
export type LeaveConversationMutationHookResult = ReturnType<typeof useLeaveConversationMutation>;
export type LeaveConversationMutationResult = ApolloReactCommon.MutationResult<LeaveConversationMutation>;
export type LeaveConversationMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveConversationMutation, LeaveConversationMutationVariables>;
export const LeftAtDocument = gql`
    query leftAt($userId: String!, $conversationId: String!) {
  leftAt(userId: $userId, conversationId: $conversationId) {
    userId
    conversationId
    leftAtMessageId
  }
}
    `;

/**
 * __useLeftAtQuery__
 *
 * To run a query within a React component, call `useLeftAtQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeftAtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeftAtQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useLeftAtQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LeftAtQuery, LeftAtQueryVariables>) {
        return ApolloReactHooks.useQuery<LeftAtQuery, LeftAtQueryVariables>(LeftAtDocument, baseOptions);
      }
export function useLeftAtLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LeftAtQuery, LeftAtQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LeftAtQuery, LeftAtQueryVariables>(LeftAtDocument, baseOptions);
        }
export type LeftAtQueryHookResult = ReturnType<typeof useLeftAtQuery>;
export type LeftAtLazyQueryHookResult = ReturnType<typeof useLeftAtLazyQuery>;
export type LeftAtQueryResult = ApolloReactCommon.QueryResult<LeftAtQuery, LeftAtQueryVariables>;
export const LikePostDocument = gql`
    mutation likePost($id: ID!) {
  likePost(id: $id) {
    node {
      ... on Post {
        ...postLikesFields
      }
    }
  }
}
    ${PostLikesFieldsFragmentDoc}`;
export type LikePostMutationFn = ApolloReactCommon.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LikedPostsDocument = gql`
    query likedPosts($userId: ID!, $offset: Int) {
  likedPosts(userId: $userId, offset: $offset) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __useLikedPostsQuery__
 *
 * To run a query within a React component, call `useLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikedPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useLikedPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LikedPostsQuery, LikedPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<LikedPostsQuery, LikedPostsQueryVariables>(LikedPostsDocument, baseOptions);
      }
export function useLikedPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LikedPostsQuery, LikedPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LikedPostsQuery, LikedPostsQueryVariables>(LikedPostsDocument, baseOptions);
        }
export type LikedPostsQueryHookResult = ReturnType<typeof useLikedPostsQuery>;
export type LikedPostsLazyQueryHookResult = ReturnType<typeof useLikedPostsLazyQuery>;
export type LikedPostsQueryResult = ApolloReactCommon.QueryResult<LikedPostsQuery, LikedPostsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on UserLoginSuccess {
      __typename
      node {
        ... on User {
          __typename
          id
          username
          email
          bio
          website
          name
          ...userAvatarFields
          ...userFollowerFields
        }
      }
      accessToken
    }
    ... on UserLoginInvalidInputError {
      __typename
      email
      password
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
    ${UserAvatarFieldsFragmentDoc}
${UserFollowerFieldsFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MessageUserDocument = gql`
    mutation messageUser($userId: ID!) {
  messageUser(userId: $userId) {
    id
    conversationId
    lastReadMessageId
    mostRecentEntryId
    oldestEntryId
    participants {
      userId
      lastReadMessageId
    }
    messages_conversation {
      conversationId
      id
      messagedata {
        text
        senderId
        receiverId
        conversationId
        id
      }
    }
    type
  }
}
    `;
export type MessageUserMutationFn = ApolloReactCommon.MutationFunction<MessageUserMutation, MessageUserMutationVariables>;

/**
 * __useMessageUserMutation__
 *
 * To run a mutation, you first call `useMessageUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageUserMutation, { data, loading, error }] = useMessageUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MessageUserMutation, MessageUserMutationVariables>) {
        return ApolloReactHooks.useMutation<MessageUserMutation, MessageUserMutationVariables>(MessageUserDocument, baseOptions);
      }
export type MessageUserMutationHookResult = ReturnType<typeof useMessageUserMutation>;
export type MessageUserMutationResult = ApolloReactCommon.MutationResult<MessageUserMutation>;
export type MessageUserMutationOptions = ApolloReactCommon.BaseMutationOptions<MessageUserMutation, MessageUserMutationVariables>;
export const PostDocument = gql`
    query post($postId: ID!) {
  post(postId: $postId) {
    ... on PostByIdSuccess {
      node {
        ... on Post {
          id
          body
          conversationId
          inReplyToId
          ...postLikesFields
          ...postConversationFields
          owner {
            id
            username
            name
            email
            ...userAvatarFields
          }
        }
      }
    }
    ... on PostByIdInvalidInputError {
      message
      id
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostsAndRepliesDocument = gql`
    query postsAndReplies($userId: ID!, $offset: Int) {
  postsAndReplies(userId: $userId, offset: $offset) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __usePostsAndRepliesQuery__
 *
 * To run a query within a React component, call `usePostsAndRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsAndRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsAndRepliesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePostsAndRepliesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsAndRepliesQuery, PostsAndRepliesQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsAndRepliesQuery, PostsAndRepliesQueryVariables>(PostsAndRepliesDocument, baseOptions);
      }
export function usePostsAndRepliesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsAndRepliesQuery, PostsAndRepliesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsAndRepliesQuery, PostsAndRepliesQueryVariables>(PostsAndRepliesDocument, baseOptions);
        }
export type PostsAndRepliesQueryHookResult = ReturnType<typeof usePostsAndRepliesQuery>;
export type PostsAndRepliesLazyQueryHookResult = ReturnType<typeof usePostsAndRepliesLazyQuery>;
export type PostsAndRepliesQueryResult = ApolloReactCommon.QueryResult<PostsAndRepliesQuery, PostsAndRepliesQueryVariables>;
export const ReadConversationDocument = gql`
    mutation readConversation($conversationId: String!, $messageId: String!) {
  readConversation(conversationId: $conversationId, messageId: $messageId) {
    id
    conversationId
    lastReadMessageId
    mostRecentEntryId
    oldestEntryId
    type
    participants {
      userId
      lastReadMessageId
    }
  }
}
    `;
export type ReadConversationMutationFn = ApolloReactCommon.MutationFunction<ReadConversationMutation, ReadConversationMutationVariables>;

/**
 * __useReadConversationMutation__
 *
 * To run a mutation, you first call `useReadConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readConversationMutation, { data, loading, error }] = useReadConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useReadConversationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReadConversationMutation, ReadConversationMutationVariables>) {
        return ApolloReactHooks.useMutation<ReadConversationMutation, ReadConversationMutationVariables>(ReadConversationDocument, baseOptions);
      }
export type ReadConversationMutationHookResult = ReturnType<typeof useReadConversationMutation>;
export type ReadConversationMutationResult = ApolloReactCommon.MutationResult<ReadConversationMutation>;
export type ReadConversationMutationOptions = ApolloReactCommon.BaseMutationOptions<ReadConversationMutation, ReadConversationMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $username: String!, $email: String!, $password: String!) {
  register(name: $name, username: $username, email: $email, password: $password) {
    __typename
    ... on UserRegisterSuccess {
      node {
        ... on User {
          id
        }
      }
    }
    ... on UserRegisterInvalidInputError {
      email
      username
      name
      password
    }
    ... on Error {
      message
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RepliesDocument = gql`
    query replies($postId: ID!, $offset: Int, $loadMoreId: ID) {
  replies(postId: $postId, offset: $offset, loadMoreId: $loadMoreId) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
      ...userFollowerFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}
${UserFollowerFieldsFragmentDoc}`;

/**
 * __useRepliesQuery__
 *
 * To run a query within a React component, call `useRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepliesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      offset: // value for 'offset'
 *      loadMoreId: // value for 'loadMoreId'
 *   },
 * });
 */
export function useRepliesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
        return ApolloReactHooks.useQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, baseOptions);
      }
export function useRepliesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, baseOptions);
        }
export type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export type RepliesQueryResult = ApolloReactCommon.QueryResult<RepliesQuery, RepliesQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($text: String!, $conversationId: String!, $senderId: ID!, $receiverId: String!) {
  sendMessage(
    text: $text
    conversationId: $conversationId
    senderId: $senderId
    receiverId: $receiverId
  ) {
    message {
      id
      conversationId
      messagedata {
        text
        id
        receiverId
        conversationId
        senderId
      }
    }
    conversation {
      conversationId
      id
      lastReadMessageId
      mostRecentEntryId
      oldestEntryId
      participants {
        userId
        lastReadMessageId
      }
      messages_conversation {
        conversationId
        id
        messagedata {
          text
          senderId
          receiverId
          conversationId
          id
        }
      }
      type
    }
  }
}
    `;
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      conversationId: // value for 'conversationId'
 *      senderId: // value for 'senderId'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateLastSeenMessageDocument = gql`
    mutation updateLastSeenMessage($messageId: String!) {
  updateLastSeenMessage(messageId: $messageId) {
    userId
    lastSeenMessageId
  }
}
    `;
export type UpdateLastSeenMessageMutationFn = ApolloReactCommon.MutationFunction<UpdateLastSeenMessageMutation, UpdateLastSeenMessageMutationVariables>;

/**
 * __useUpdateLastSeenMessageMutation__
 *
 * To run a mutation, you first call `useUpdateLastSeenMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastSeenMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastSeenMessageMutation, { data, loading, error }] = useUpdateLastSeenMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useUpdateLastSeenMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLastSeenMessageMutation, UpdateLastSeenMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLastSeenMessageMutation, UpdateLastSeenMessageMutationVariables>(UpdateLastSeenMessageDocument, baseOptions);
      }
export type UpdateLastSeenMessageMutationHookResult = ReturnType<typeof useUpdateLastSeenMessageMutation>;
export type UpdateLastSeenMessageMutationResult = ApolloReactCommon.MutationResult<UpdateLastSeenMessageMutation>;
export type UpdateLastSeenMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLastSeenMessageMutation, UpdateLastSeenMessageMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userId: ID!, $name: String, $bio: String, $website: String) {
  updateUser(userId: $userId, name: $name, bio: $bio, website: $website) {
    __typename
    ... on UserUpdateSuccess {
      node {
        ... on User {
          id
          name
          bio
          website
          ...userFollowerFields
          ...userAvatarFields
        }
      }
    }
    ... on UserUpdateInvalidInputError {
      name
      bio
      website
      message
    }
  }
}
    ${UserFollowerFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      bio: // value for 'bio'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation uploadAvatar($file: Upload!, $userId: ID!) {
  uploadAvatar(file: $file, userId: $userId) {
    status
    node {
      ... on User {
        id
        name
        username
        email
        ...userAvatarFields
      }
    }
  }
}
    ${UserAvatarFieldsFragmentDoc}`;
export type UploadAvatarMutationFn = ApolloReactCommon.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      file: // value for 'file'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, baseOptions);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = ApolloReactCommon.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const UserInboxDocument = gql`
    query userInbox {
  userInbox {
    userId
    lastSeenMessageId
    conversations {
      conversationId
      id
      lastReadMessageId
      mostRecentEntryId
      oldestEntryId
      participants {
        userId
        lastReadMessageId
      }
      messages_conversation {
        conversationId
        id
        messagedata {
          text
          senderId
          receiverId
          conversationId
          id
        }
      }
      type
    }
    users {
      id
      avatar
      username
    }
  }
}
    `;

/**
 * __useUserInboxQuery__
 *
 * To run a query within a React component, call `useUserInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInboxQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInboxQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserInboxQuery, UserInboxQueryVariables>) {
        return ApolloReactHooks.useQuery<UserInboxQuery, UserInboxQueryVariables>(UserInboxDocument, baseOptions);
      }
export function useUserInboxLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserInboxQuery, UserInboxQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserInboxQuery, UserInboxQueryVariables>(UserInboxDocument, baseOptions);
        }
export type UserInboxQueryHookResult = ReturnType<typeof useUserInboxQuery>;
export type UserInboxLazyQueryHookResult = ReturnType<typeof useUserInboxLazyQuery>;
export type UserInboxQueryResult = ApolloReactCommon.QueryResult<UserInboxQuery, UserInboxQueryVariables>;
export const UserPostsDocument = gql`
    query userPosts($userId: ID!, $offset: Int) {
  userPosts(userId: $userId, offset: $offset) {
    id
    body
    conversationId
    inReplyToId
    ...postLikesFields
    ...postConversationFields
    owner {
      id
      username
      name
      email
      ...userAvatarFields
    }
  }
}
    ${PostLikesFieldsFragmentDoc}
${PostConversationFieldsFragmentDoc}
${UserAvatarFieldsFragmentDoc}`;

/**
 * __useUserPostsQuery__
 *
 * To run a query within a React component, call `useUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useUserPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
      }
export function useUserPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
        }
export type UserPostsQueryHookResult = ReturnType<typeof useUserPostsQuery>;
export type UserPostsLazyQueryHookResult = ReturnType<typeof useUserPostsLazyQuery>;
export type UserPostsQueryResult = ApolloReactCommon.QueryResult<UserPostsQuery, UserPostsQueryVariables>;