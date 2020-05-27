import React, { useEffect } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@material-ui/core';
import TalkCardView from '../../menu/TalkCardViews';

interface IProps {
  talk: any;
  onClose: any;
  open: boolean;
}

const OldSessions: React.FC<IProps> = (props) => {
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
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Louis do smthg');
            }}
            color="primary"
          >
            View Session
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OldSessions;
