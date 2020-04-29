import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { postTalk } from '../../dataTransfers/DataTalkPost';
import { InitialState } from '../../store/reducers/MainReducer';
import { RootDispatcher } from '../../store/MainDispatcher';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import CustomSnackBar from '../../components/materialUI/CustomSnackBar';

interface StateProps {
  changeRequestRdx: number;
}

interface IProps {
  quizzes: number[];
}

const CreateTalkPopUp: React.FC<IProps> = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [snackBarMessage, setSnackBarMessage] = useState('');
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
    if (!name) {
      setSnackBarMessage("The talk's name is required");
    } else {
      setOpen(false);
      await postTalk(TalkJson);
      rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuizzes([]);
  };

  const onSelectQuizz = (value: string) => {
    setSelectedQuizzes([...selectedQuizzes, value]);
  };

  const onRemoveQuizz = (value: string) => {
    setSelectedQuizzes(selectedQuizzes.filter((val) => val !== value));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    addQuizzDiv: {
      marginTop: '4%',
      marginBottom: '1%',
    },
    select: {
      marginBottom: '1%',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new Talk
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Create new Talk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Creating a new Talk, please enter its name and a description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Talk name"
            type="text"
            className="talkName"
            required={true}
            error={!!snackBarMessage}
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
              <DialogContentText className={classes.addQuizzDiv}>
                Add one or more quizzes to your talk:
              </DialogContentText>
              <Select
                labelId="label"
                id="select"
                value="0"
                onChange={(e: any) =>
                  !selectedQuizzes.includes(e.target.value) &&
                  onSelectQuizz(e.target.value)
                }
                className={classes.select}
              >
                <MenuItem value="0" disabled={true}>
                  Select a quizz
                </MenuItem>
                {props.quizzes.map(
                  (quizz: any) =>
                    quizz.name && (
                      <MenuItem value={quizz.id} key={quizz.id}>
                        {quizz.name}
                      </MenuItem>
                    ),
                )}
              </Select>
              {selectedQuizzes.length > 0 && (
                <Paper component="ul" className={classes.root}>
                  {props.quizzes.map(
                    (quizz: any) =>
                      selectedQuizzes.includes(quizz.id) && (
                        <li key={quizz.id}>
                          <Chip
                            label={quizz.name}
                            onDelete={() =>
                              selectedQuizzes.includes(quizz.id) &&
                              onRemoveQuizz(quizz.id)
                            }
                            className={classes.chip}
                            color="primary"
                            variant="outlined"
                          />
                        </li>
                      ),
                  )}
                </Paper>
              )}
            </>
          )}
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
      {snackBarMessage && (
        <CustomSnackBar message={snackBarMessage} variant="error" />
      )}
    </div>
  );
};
export default CreateTalkPopUp;
