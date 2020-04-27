import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postTalk } from '../../dataTransfers/DataTalkPost';
import { InitialState } from '../../store/reducers/MainReducer';
import { RootDispatcher } from '../../store/MainDispatcher';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

interface StateProps {
  changeRequestRdx: number;
}

interface IProps {
  quizzes: number[];
}

const CreateTalkPopUp: React.FC<IProps> = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);

  const { changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        changeRequestRdx: state.changeRequestRdx,
      };
    },
  );
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const TalkJson = [
    {
      name: { name },
      description: { description },
      quizzesId: { selectedQuizzes },
    },
  ];

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const postNewTalk = async () => {
    setOpen(false);
    await postTalk(TalkJson);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuizzes([]);
  };

  const onCheckQuizz = async (value: string) => {
    if (selectedQuizzes.includes(value)) {
      setSelectedQuizzes(selectedQuizzes.filter((val) => val !== value));
    } else {
      setSelectedQuizzes([...selectedQuizzes, value]);
    }
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new Talk
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new Talk</DialogTitle>
        <DialogContent>
          <>
            <DialogContent>
              <DialogContentText>
                Creating a new Talk, please enter its name and ulpload your
                presentation (ppt format)
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Talk name"
                type="text"
                className="talkName"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onNameChange(event);
                }}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                className="talkDescription"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onDescriptionChange(event);
                }}
                fullWidth
              />
              {props.quizzes && (
                <>
                  <div>Add one or more quizzes to your talk:</div>

                  <FormGroup>
                    {props.quizzes.map(
                      (quizz: any) =>
                        quizz.name && (
                          <FormControlLabel
                            control={
                              <Checkbox value={quizz.id} color="primary" />
                            }
                            label={quizz.name}
                            key={quizz.id}
                            onChange={(e: any) => onCheckQuizz(e.target.value)}
                          />
                        ),
                    )}
                  </FormGroup>
                </>
              )}
            </DialogContent>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="outlined" onClick={postNewTalk}>
            Create Talk
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateTalkPopUp;
