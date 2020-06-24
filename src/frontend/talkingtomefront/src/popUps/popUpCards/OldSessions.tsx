import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  List,
  ListItemText,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  DialogContentText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import { InitialState } from '../../store/reducers/MainReducer';
import { getSessionsByTalkId } from '../../dataTransfers/Fetchs/DataSessionFetch';
import DeleteSessionPopUp from './DeleteSessionPopUp';
import { useHistory } from 'react-router-dom';

interface IProps {
  talk: any;
  onClose: any;
  open: boolean;
}

interface StateProps {
  tokenIdRdx: string;
}

const OldSessions: React.FC<IProps> = (props) => {
  const [sessions, setSessions] = useState<any>([]);
  const [openDeleteSession, setOpenDeleteSession] = useState(false);
  const [sessionIdToDelete, setSessionIdToDelete] = useState(-1);
  const history = useHistory();

  const { tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        tokenIdRdx: state.tokenIdRdx,
      };
    },
  );

  const displayDateLine = (session: any) => {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Paris',
    };
    return new Date(session.startDate).toLocaleString('en-US', options);
  };

  const onClickDelete = (sessionId: number) => {
    setSessionIdToDelete(sessionId);
    setOpenDeleteSession(!openDeleteSession);
  };

  useEffect(() => {
    getSessionsByTalkId(props.talk.id, tokenIdRdx).then((json) =>
      setSessions(json),
    );
  }, [openDeleteSession, props.talk.id, tokenIdRdx]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Previous sessions of {props.talk.name}
        </DialogTitle>
        <DialogContent>
          {sessions && sessions.length ? (
            <List dense>
              {sessions.map(
                (session: any) =>
                  session && (
                    <ListItem button>
                      <ListItemText
                        primary={displayDateLine(session)}
                        secondary={'This session lasted ' + session.timeLasted}
                        onClick={() =>
                          history.push(`/SessionReview?sessionId=${session.id}`)
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onClickDelete(session.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ),
              )}
            </List>
          ) : (
            <DialogContentText>
              The sessions history for this talk is empty
            </DialogContentText>
          )}
        </DialogContent>
        {openDeleteSession && (
          <DeleteSessionPopUp
            open={openDeleteSession}
            sessionId={sessionIdToDelete}
            handleClose={() => setOpenDeleteSession(false)}
          />
        )}
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OldSessions;
