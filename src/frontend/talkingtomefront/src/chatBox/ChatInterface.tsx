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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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
  const connection = props.connection
  const groupId = props.groupId

  if (connection) {
    connection.on('AddNewQuestion', () => {})
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
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <div>
        <textarea
          rows={4}
          cols={50}
          name="comment"
          form="usrform"
          onChange={handleQuestionChange}
        >
          Enter text here...
        </textarea>
        <Button onClick={SendNewQuestions}>Send</Button>
      </div>
    </div>
  )
}
export default ChatInterface
