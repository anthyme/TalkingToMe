import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QuizzCreator from '../../quizzCreation/QuizzCreator';
import { InitialState } from '../../store/reducers/MainReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatcher } from '../../store/MainDispatcher';

interface StateProps {
  changeRequestRdx: number;
  questionIdRdx: number;
}

function CreateQuizzPopUp() {
  const [open, setOpen] = React.useState(false);

  const { changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        changeRequestRdx: state.changeRequestRdx,
        questionIdRdx: state.questionIdRdx,
      };
    },
  );
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    setOpen(false);
  }, [changeRequestRdx]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    rootDispatcher.setQuestionIdRdx(-1);
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
