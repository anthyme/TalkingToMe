import React, { useState } from 'react'
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
}

const ChatInterface: React.FC<IProps> = (props) => {
  const classes = useStyles()
  const [question, setQuestion] = useState('')
  const [userName, setUserName] = useState('')
  const [messages, setMessages] = useState([{}])
  const connection = props.connection
  const groupId = props.groupId

  if (connection) {
    connection.on('AddNewQuestion', (result: any) => {
      console.log(result);
      let newQuestionList=[...messages, result];
      setMessages(newQuestionList);
    })
  }
  const SendNewQuestions = () => {
    if (connection) {
      connection.invoke('PostQuestion', groupId, question, userName)
    }
  }
  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value)
  }
  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value)
  }
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
      {messages ? (messages.map(
              (message: any) =>
                  <Message connection={connection} message={message}/>
            )) : <></>}
      </List>
      </div>
      <div className={classes.bottom}>
        <textarea
          rows={4}
          cols={50}
          name="comment"
          form="usrform"
          onChange={handleQuestionChange}
          placeholder="Enter text here..."
        />
        <Button onClick={SendNewQuestions}>Send</Button>
      </div>
    </div>
  )
}
export default ChatInterface
