import React, { useState, ChangeEvent, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postTalk } from '../../dataTransfers/DataTalkPost';
import DropZone from './DropZone';
import QuizzCreator from '../../quizzCreation/QuizzCreator';
import { InitialState } from '../../store/reducers/MainReducer';
import { RootDispatcher } from '../../store/MainDispatcher';
import { useSelector, useDispatch } from 'react-redux';

interface StateProps {
  changeRequestRdx: number;
}

function CreateQuizzPopUp() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);

  const { changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        changeRequestRdx: state.changeRequestRdx,
      };
    },
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(false);
  }, [changeRequestRdx]);

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new Quizz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new Quizz</DialogTitle>
        <DialogContent>
          <>
            <DialogContent>
              <DialogContentText>
                Creating a new Quizz, please enter its name and as many
                questions as wanted
              </DialogContentText>
              <QuizzCreator />
            </DialogContent>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreateQuizzPopUp;
