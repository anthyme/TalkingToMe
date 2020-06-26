import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { Button, TextField, IconButton, Box } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './MessageStyles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
interface IProps {
  connection: any;
  message: any;
  likedQuestions: number[];
  changeLikedQuestions: Function;
  groupId: string | null;
  talkerChat: boolean;
  mutedUsers?: string[];
  changeMutedUsers?: Function;
  isChatActive: boolean;
}

const Message: React.FC<IProps> = (props) => {
  const connection = props.connection;
  const message = props.message;
  const groupId = props.groupId;
  const talkerChat = props.talkerChat;
  const likedQuestions = props.likedQuestions;
  const mutedUsers = props.mutedUsers;
  const changeLikedQuestions = props.changeLikedQuestions;
  const changeMutedUsers = props.changeMutedUsers;
  const userContext = message.UserContext !== null ? message.UserContext : '';

  const [upvoted, setUpVoted] = useState(false);
  const muted = mutedUsers?.indexOf(message.UserContext) !== -1 ? true : false;
  const [upvotes, setUpvotes] = useState(
    message.upvotes !== null ? message.upvotes : 0,
  );

  const changeUpvote = (addUpvote: boolean) => {
    if (connection) {
      connection.invoke('ChangeUpVote', groupId, message.id, addUpvote);
    }
  };

  const handleUpvote = () => {
    if (upvoted) {
      setUpVoted(false);
      changeUpvote(false);
      changeLikedQuestions(false, message.id);
    } else {
      setUpVoted(true);
      changeUpvote(true);
      changeLikedQuestions(true, message.id);
    }
  };

  const handleMuteUnmute = () => {
    if (connection) {
      connection.invoke('MuteUnmuteUser', groupId, userContext);
      if (changeMutedUsers) {
        changeMutedUsers(message.UserContext);
      }
    }
  };

  useEffect(() => {
    if (likedQuestions.indexOf(message.id) >= 0) {
      setUpVoted(true);
    }
    connection &&
      connection.on('ConfirmChangedUpvote', (upvotesDTO: any) => {
        if (upvotesDTO.id === message.id) {
          setUpvotes(upvotesDTO.upvotes);
        }
      });
  }, []); //Load only on
  return (
    <div>
      {message.id ? (
        <div className="tooltip" key={message.id}>
          <div className="talk-bubble round border">
            <div className="talktext">
              <p>{message.question}</p>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
              >
                <Box p={0} m={0} flexGrow={1}></Box>
                <Box p={0}>
                  {upvotes !== 0 ? upvotes : <></>}
                  {upvoted === true ? (
                    <IconButton
                      onClick={handleUpvote}
                      disabled={!props.isChatActive}
                    >
                      <ThumbUpAltIcon color="primary" fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleUpvote}
                      disabled={!props.isChatActive}
                    >
                      <ThumbUpAltIcon color="disabled" fontSize="small" />
                    </IconButton>
                  )}
                  {talkerChat === true ? (
                    muted ? (
                      <IconButton onClick={handleMuteUnmute}>
                        <SpeakerNotesOffIcon
                          color="secondary"
                          fontSize="small"
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleMuteUnmute}>
                        <SpeakerNotesOffIcon color="primary" fontSize="small" />
                      </IconButton>
                    )
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </div>
          </div>
          <span className="time_date">
            {' '}
            {message.username} | {message.date}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Message;
