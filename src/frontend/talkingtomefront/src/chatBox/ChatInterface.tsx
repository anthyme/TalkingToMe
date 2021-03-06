import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';
import { TextField, IconButton } from '@material-ui/core';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
  bottom: {
    position: 'absolute',
    //bottom: '5px',
  },
  inline: {
    display: 'center',
  },
  overflow: {
    overflowY: 'scroll',
    height: '545px',
  },
  textArea: {
    resize: 'none',
  },
}));
interface IProps {
  connection: any;
  groupId: string | null;
  likedQuestions: number[];
  username: string;
  changeLikedQuestions: Function;
  changeUserName: Function;
  talkerChat: boolean;
  mutedUsers?: string[];
  changeMutedUsers?: Function;
  isChatActive: boolean;
  historyMessages: any;
}

const ChatInterface: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const username = props.username;
  const talkerChat = props.talkerChat;
  const [question, setQuestion] = useState('');
  const [userName, setUserName] = useState(username);
  const [messages, setMessages] = useState([{}]);
  const connection = props.connection;
  const groupId = props.groupId;
  const changeUsername = props.changeUserName;
  const mutedUsers = props.mutedUsers;
  const changeMutedUsers = props.changeMutedUsers;
  const isChatActive = props.isChatActive;
  const historyMessages = props.historyMessages;

  const SendNewQuestions = () => {
    if (connection) {
      const date = new Date();
      const dateString =
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds() +
        ' | ' +
        date.getDay() +
        '/' +
        date.getMonth() +
        '/' +
        date.getFullYear();
      connection.invoke(
        'PostQuestion',
        groupId,
        question,
        userName,
        dateString,
      );
    }
    setQuestion('');
  };
  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };

  const handleUserNameChange = (event: any) => {
    changeUsername(event.target.value);
    setUserName(event.target.value);
  };
  useEffect(() => {
    if (isChatActive) {
      connection.invoke('GetCurrentSessionUserQuestions', groupId);
      connection.invoke('GetCurrentSessionMutedUsers', groupId);
      connection.on('AddNewQuestion', async (result: any) => {
        console.log(result);
        if (messages[0] === {}) {
          setMessages([result]);
        } else {
          let newQuestionList = messages;
          newQuestionList.push(result);
          setMessages([...messages]);
        }
        const scrollMessages = document.getElementById('scrollMessages');
        if (scrollMessages !== null) {
          const shouldScroll =
            scrollMessages.scrollTop + scrollMessages.clientHeight >=
            scrollMessages.scrollHeight - 100;
          if (shouldScroll) {
            scrollMessages.scrollTop = scrollMessages.scrollHeight;
          }
        }
      });
      connection.on('ShowCurrentUserQuestions', async (results: any) => {
        let newQuestionList = messages;
        console.log(results);
        if (results !== null) {
          results.forEach((element: Object) => {
            newQuestionList.push(element);
          });
          setMessages([...messages]);
        }
        const scrollMessages = document.getElementById('scrollMessages');
        if (scrollMessages !== null) {
          scrollMessages.scrollTop = scrollMessages.scrollHeight;
        }
      });
    } else {
      historyMessages && setMessages(historyMessages);
    }
  }, []); //Load only on

  console.log('Louis', messages[0]);
  return (
    <div>
      {!isChatActive && messages[0] !== {} && (
        <div>There has been no usage of the chat during this session</div>
      )}
      {isChatActive && (
        <TextField
          name={userName}
          value={userName}
          label="UserName"
          fullWidth
          className="questionText"
          autoComplete="fname"
          onChange={handleUserNameChange}
        />
      )}
      <div className={classes.overflow} id="scrollMessages">
        <List className={classes.root}>
          {messages ? (
            messages.map((message: any, index: number) => (
              <Message
                key={index}
                connection={isChatActive ? connection : null}
                message={message}
                likedQuestions={props.likedQuestions}
                changeLikedQuestions={props.changeLikedQuestions}
                groupId={groupId}
                talkerChat={talkerChat}
                mutedUsers={mutedUsers}
                changeMutedUsers={changeMutedUsers}
                isChatActive={isChatActive}
              />
            ))
          ) : (
            <></>
          )}
        </List>
      </div>
      {isChatActive && (
        <div className={classes.bottom}>
          <textarea
            className={classes.textArea}
            rows={2}
            cols={50}
            name="comment"
            form="usrform"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter text here..."
            disabled={!isChatActive}
          />
          <IconButton
            onClick={SendNewQuestions}
            className="tooltiptext"
            disabled={question === '' || !isChatActive}
          >
            {question ? (
              <SendIcon color="primary" fontSize="large" />
            ) : (
              <SendIcon color="disabled" fontSize="large" />
            )}
          </IconButton>
        </div>
      )}
    </div>
  );
};
export default ChatInterface;
