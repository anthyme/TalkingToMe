import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { deleteSessionById } from '../../dataTransfers/Posts/DataSessionPost';
import { useSelector } from 'react-redux';
import { InitialState } from '../../store/reducers/MainReducer';

interface IProps {
  open: boolean;
  sessionId: number;
  handleClose: any;
}
interface StateProps {
  tokenIdRdx: string;
}

const DeleteSessionPopUp: React.FC<IProps> = (props) => {
  const { tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        tokenIdRdx: state.tokenIdRdx,
      };
    },
  );

  const deleteSession = (sessionId: number) => {
    deleteSessionById(sessionId, tokenIdRdx);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        This Delete is irreversible
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this session from your history?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteSession(props.sessionId);
          }}
          color="secondary"
          autoFocus
          className="confirmDelete"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSessionPopUp;
