import * as React from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { ReactComponent as SadFace } from "../../components/svgs/SadFace.svg";
import {
  ConversationMessagesQuery,
  ConversationMessagesDocument,
  User,
  SendMessageMutation,
  SendMessageDocument,
  MessageSentDocument,
  UserConversationsQuery,
} from "../../generated/graphql";
import {
  Spinner,
  SpanContainer,
  BaseStyles,
  BaseStylesDiv,
  StyledForm,
  AvatarContainer,
  StyledAvatar,
} from "../../styles";
import Editor from "draft-js-plugins-editor";
import createEmojiMartPlugin from "draft-js-emoji-mart-plugin";
import styled, { css } from "styled-components";
import { Field, Formik } from "formik";
import { EditorState, DraftHandleValue, ContentState } from "draft-js";
import data from "emoji-mart/data/all.json";
import {
  DropdownProvider,
  useDropDown,
  useDropdownCtxt,
} from "../../components/DropDown";
import { moveUpAndLeftReducer } from "../../components/DropDown/reducers";
import { StyledDropDownItem } from "../../components/DropDown/DropDownComposition/Menu";
import CompositeDecorator from "../../components/CreatePost/CompositeDecorator";
import { Header } from "../../components/Header";

const emojiPlugin = createEmojiMartPlugin({
  data,
  set: "google",
});
const { Picker } = emojiPlugin;
const StyledContainer = styled.div<{ height: number }>`
  ${BaseStyles};
  padding: 10px;
  flex-direction: column;
  overflow-y: auto;
  min-height: ${(props) => props.height - 109}px;
  max-height: ${(props) => props.height - 109}px;
  height: 100%;
  width: auto;
`;

export const InputContainer = styled(Field)`
  ${BaseStyles};
  border-width: 0px;
  display: none;
  border-style: inset;
  width: 100%;
  background-color: var(--colors-thirdbackground);
  outline: none;
  padding: 2px 10px 5px 10px;
  color: var(--colors-maintext);
  font-size: 19px;
`;

const MessageContainer = styled.div<{ isItMyMsg: boolean }>`
  ${BaseStyles};
  justify-content: ${(props) => (props.isItMyMsg ? "flex-end" : "flex-start")};
`;

const MessageWrapper = styled.div<{ isItMyMsg: boolean }>`
  ${BaseStyles};
  flex-direction: column;
  max-width: 80%;
  width: 100%;
  align-items: ${(props) => (props.isItMyMsg ? "flex-end" : "flex-start")};
`;

const StyledMessage = styled.div<{ isItMyMsg: boolean }>`
  ${({ isItMyMsg }) => css`
    ${BaseStyles};
    max-width: 85%;
    border: 1px solid ${isItMyMsg ? "var(--colors-button)" : "rgb(37, 51, 65)"};
    border-radius: 16px;
    background-color: ${isItMyMsg ? "var(--colors-button)" : "rgb(37, 51, 65)"};
    border-bottom-left-radius: ${isItMyMsg ? "16px" : "0px"};
    border-bottom-right-radius: ${isItMyMsg ? "0px" : "16px"};
    padding: 10px;
    margin: 5px;
  `}
`;

const StyledFormArea = styled.div`
  ${BaseStyles};
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 10px 10px 5px 10px;
  border-top: 1px solid var(--colors-border);
  background-color: var(--colors-mainbackground);
`;

const ChatBox = styled.div`
  ${BaseStyles};
  flex-grow: 1;
  border-top: 1px solid var(--colors-border);
  border: 1px solid var(--colors-button);
  border-radius: 15px;
  background-color: var(--colors-thirdbackground);
  align-items: flex-end;
  justify-content: space-between;
  ::hover {
    cursor: text;
  }
  &:focus {
    background-color: var(--colors-mainbackground);
  }
`;

const StyledEditorContainer = styled.div`
  ${BaseStyles};
  display: flex;
  flex-grow: 1;
  padding: 5.5px;
  flex-direction: column;
  width: 0px;
  margin: 0px 10px;
  line-height: 1.3125;
  height: 100%;
  font-size: 15px;
  max-height: 125px;
  overflow-y: auto;
  overflow-wrap: break-word;
`;

const StyledEmojiPickerContainer = styled.div`
  ${BaseStyles};
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 32px;
  height: 32px;
  justify-content: center;
  :hover {
    cursor: pointer;
    border-radius: 9999px;
    background-color: var(--colors-button-hover-opacity);
  }
`;

interface Props {
  user: User;
  members: UserConversationsQuery;
}

export const Messages: React.FC<Props> = ({ user, members }) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [state, setState] = React.useState(() => EditorState.createEmpty());

  const chatRef = React.useRef<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const { loading: _loading } = useSubscription(MessageSentDocument, {
    variables: { conversationId: conversationId && conversationId },
  });

  const [height, setHeight] = React.useState(window.innerHeight);

  const [sendMessage] = useMutation<SendMessageMutation>(SendMessageDocument);
  let thread: any = [];
  let conversationThread: any = React.useMemo(() => [], []);
  let userThread: any = React.useMemo(() => [], []);
  members &&
    members.userConversations &&
    members!.userConversations.forEach(
      (conversation) => (conversationThread[conversation.id] = conversation)
    );
  members &&
    members.userConversations &&
    conversationThread &&
    members!.userConversations![conversationThread] &&
    members!.userConversations![conversationThread].members!.forEach(
      (user) => (thread[user.id] = user)
    );

  React.useEffect(() => {
    conversationThread &&
      conversationThread![conversationId]!.members!.forEach(
        (member: any) => (userThread[member.id] = member)
      );
  }, [conversationThread, conversationId, userThread]);

  const {
    data: _data,
    loading,
    subscribeToMore,
  } = useQuery<ConversationMessagesQuery>(ConversationMessagesDocument, {
    variables: { conversationId: conversationId },
    fetchPolicy: "network-only",
  });

  const setHeightToWindowSize = () => {
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    if (chatRef && chatRef.current) {
      const scroll =
        chatRef.current.scrollHeight - chatRef.current.clientHeight;
      chatRef && (chatRef!.current!.scrollTo(0, scroll) as any);
    }
    window.addEventListener("resize", setHeightToWindowSize);
    return () => window.removeEventListener("resize", setHeightToWindowSize);
  });

  const isItMyLastMsg = (index: number) => {
    return !!(_data && _data!.conversationMessages![index + 1]
      ? _data!.conversationMessages![index + 1].messagedata.senderId !==
        _data!.conversationMessages![index].messagedata.senderId
      : _data!.conversationMessages![_data!.conversationMessages!.length - 1]
          .id);
  };

  React.useEffect(() => {
    let unsubscribe: any;
    unsubscribe = subscribeToMore({
      document: MessageSentDocument,
      variables: { conversationId: conversationId },

      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData!.data!.messageSent;

        return Object.assign({}, prev, {
          conversationMessages: [...prev.conversationMessages, newMessage],
        });
      },
    });
    if (unsubscribe) return () => unsubscribe();
  }, [subscribeToMore, conversationId]);

  const isItMyMessage = (message: { messagedata: { senderId: string } }) =>
    !!(user.id === message.messagedata.senderId);

  return (
    <>
      {conversationThread ? (
        <Header justifyStart>
          <BaseStylesDiv flexGrow style={{ alignItems: "center" }}>
            {conversationThread[conversationId]!.members!.filter(
              (member: any) => member.id !== user.id
            )
              .slice(
                Math.max(
                  conversationThread[conversationId]!.members!.length - 3,
                  0
                )
              )
              .map((user: any, index: any) =>
                conversationThread[conversationId]!.members!.filter(
                  (member: any) => member.id !== user.id
                ).length > 1 ? (
                  <section key={user.id} style={{ display: "contents" }}>
                    <AvatarContainer
                      style={
                        index % 2 !== 0 || index !== 0
                          ? { transform: "scaleX(-1)" }
                          : {}
                      }
                      displayAsGroup
                      height="34px"
                      width={34}
                    >
                      <StyledAvatar url={user.avatar} />
                    </AvatarContainer>
                    <BaseStylesDiv
                      style={
                        index % 2 === 0 || index === 0
                          ? {
                              height: "100%",
                              width: "1px",
                              backgroundColor: "var(--colors-mainbackground)",
                            }
                          : {}
                      }
                    ></BaseStylesDiv>
                  </section>
                ) : (
                  <section key={user.id} style={{ display: "contents" }}>
                    <AvatarContainer height="34px" width={34} noRightMargin>
                      <StyledAvatar url={user.avatar} />
                    </AvatarContainer>
                  </section>
                )
              )}
            <BaseStylesDiv
              flexGrow
              style={{
                margin: "0px 0px 0px 10px",
                width: "0px",
                textOverflow: "ellipsis",
              }}
            >
              <SpanContainer bold biggest>
                {conversationThread!
                  [conversationId]!.members!.filter(
                    (member: any) => member.id !== user.id
                  )
                  .map((user: any, index: any) => (
                    <section key={user.id} style={{ display: "contents" }}>
                      {user.username}
                      <span>
                        {index <
                        conversationThread![conversationId]!.members!.filter(
                          (member: any) => member.id !== user.id
                        ).length -
                          1
                          ? ","
                          : ""}
                      </span>
                      <span>&nbsp;</span>
                    </section>
                  ))}
              </SpanContainer>
            </BaseStylesDiv>
          </BaseStylesDiv>
        </Header>
      ) : null}
      <StyledContainer height={height} ref={chatRef}>
        {_data ? (
          _data!.conversationMessages!.map((message, index) => (
            <MessageContainer
              key={message.id}
              isItMyMsg={isItMyMessage(message)}
            >
              <MessageWrapper isItMyMsg={isItMyMessage(message)}>
                <StyledMessage isItMyMsg={isItMyMessage(message)}>
                  <SpanContainer breakSpaces>
                    <span>{message.messagedata.text}</span>
                  </SpanContainer>
                </StyledMessage>
                <SpanContainer smaller grey style={{ marginLeft: "5px" }}>
                  {isItMyLastMsg(index)
                    ? userThread[message.messagedata.senderId].username
                    : null}
                </SpanContainer>
              </MessageWrapper>
            </MessageContainer>
          ))
        ) : loading ? (
          <Spinner />
        ) : null}
      </StyledContainer>
      <StyledFormArea>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={async (values, { resetForm }) => {
            await sendMessage({
              variables: {
                text: values.text,
                senderId: user.id,
                conversationId: conversationId,
              },
            });

            resetForm();
            setState(
              EditorState.moveFocusToEnd(
                EditorState.push(
                  state,
                  ContentState.createFromText(""),
                  "remove-range"
                )
              )
            );
          }}
        >
          {({ setFieldValue, handleSubmit }) => {
            return (
              <StyledForm
                style={{ flexDirection: "row" }}
                onSubmit={handleSubmit}
              >
                <ChatBox>
                  <DropdownProvider
                    position="absolute"
                    reducer={moveUpAndLeftReducer}
                  >
                    <StyledEditorContainer>
                      <ChatEditor
                        handleSubmission={handleSubmit}
                        state={state}
                        setFieldValue={setFieldValue}
                        setState={setState}
                      />
                    </StyledEditorContainer>

                    <DropdownProvider.Toggle>
                      <StyledEmojiPickerContainer
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <BaseStylesDiv
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <SadFace
                            height="1.4em"
                            width="1.4em"
                            fill="var(--colors-button)"
                          />
                        </BaseStylesDiv>
                      </StyledEmojiPickerContainer>
                    </DropdownProvider.Toggle>
                    <DropdownProvider.Menu>
                      <StyledDropDownItem>
                        <Picker
                          theme="auto"
                          style={{
                            backgroundColor: "var(--colors-background)",
                          }}
                          perLine={7}
                          color="var(--colors-button)"
                          showPreview={false}
                        />
                      </StyledDropDownItem>
                    </DropdownProvider.Menu>
                  </DropdownProvider>
                </ChatBox>
                {/* <button type="submit">submit</button> */}
                {/* disabled if input value.length = 0 */}
              </StyledForm>
            );
          }}
        </Formik>
      </StyledFormArea>
    </>
  );
};

const ChatEditor: React.FC<any> = ({
  handleSubmission,
  state,
  setState,
  setFieldValue,
}) => {
  const editorRef = React.useRef<Editor | null>(null);

  const { state: dropdownState } = useDropdownCtxt();
  const location = useLocation();
  const handleReturn = (e: React.KeyboardEvent, state: EditorState) => {
    const handled: DraftHandleValue = "handled";
    const notHandled: DraftHandleValue = "not-handled";
    if (e.shiftKey) return notHandled;

    if (
      e.key === "Enter" &&
      state.getCurrentContent().getPlainText().length >= 1
    ) {
      handleSubmission();
      return handled;
    }
    return handled;
  };

  React.useEffect(() => {
    if (editorRef && editorRef.current && !dropdownState.open) {
      editorRef!.current!.focus();
    }
  }, [dropdownState.open, dropdownState, location]);

  const handleChange = (state: EditorState) => {
    setFieldValue("text", state.getCurrentContent().getPlainText());

    setState(state);
  };

  return (
    <Editor
      ref={editorRef}
      plugins={[emojiPlugin]}
      editorState={state}
      placeholder="Start a new message"
      onChange={handleChange}
      handleReturn={handleReturn}
    />
  );
};
