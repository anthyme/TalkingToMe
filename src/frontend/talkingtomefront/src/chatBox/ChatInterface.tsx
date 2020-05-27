import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Button, TextField } from '@material-ui/core'
import Message from './Message'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,

  },
  bottom: {
    position: "absolute", 
    bottom: "5px",
},
  inline: {
    display: 'center',
  },
  overflow: {
    overflow: "auto",
  },
}))
interface IProps {
  connection: any
  groupId: string | null
  likedQuestions: number[]
  changeLikedQuestions: Function
}

const ChatInterface: React.FC<IProps> = (props) => {
  const classes = useStyles()
  const [question, setQuestion] = useState('')
  const [userName, setUserName] = useState('')
  const [messages, setMessages] = useState([{}])
  const connection = props.connection
  const groupId = props.groupId

  const SendNewQuestions = () => {
    if (connection) {
      connection.invoke('PostQuestion', groupId, question, userName)
    }
    setQuestion('');
  }
  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value)
  }
  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value)
  }
  useEffect(() => {
    connection.invoke("GetCurrentSessionUserQuestions", groupId);
    connection.on('AddNewQuestion', async (result: any) => {
      if(messages[0]==={}){
        await setMessages([result]);
      } else{
        let newQuestionList=messages;
        newQuestionList.push(result);
        console.log(newQuestionList)
        await setMessages([...messages]);
      }
    });
    connection.on('ShowCurrentUserQuestions', async (results: any) => {
        let newQuestionList=messages;
        console.log(results)
        if(results!==null){
          results.forEach((element: Object) => {
            newQuestionList.push(element);
          });
          console.log(newQuestionList)
          await setMessages([...messages]);
        }
    })
    
  }, []) //Load only on
  return (
    <div>
      <TextField
        name={userName}
        value={userName}
        label="UserName"
        fullWidth
        className="questionText"
        autoComplete="fname"
        onChange={handleUserNameChange}
      />
      <div className={classes.overflow}>
      <List className={classes.root}>
      {messages.length!==1 ? (messages.map(
              (message: any) =>
                  <Message connection={connection} message={message} likedQuestions={props.likedQuestions} changeLikedQuestions={props.changeLikedQuestions}/>
            )) : <></>}
      </List>
      </div>
      <div className={classes.bottom}>
        <textarea
          rows={4}
          cols={50}
          name="comment"
          form="usrform"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter text here..."
        />
        <Button onClick={SendNewQuestions}>Send</Button>
      </div>
    </div>
  )
}
export default ChatInterface
