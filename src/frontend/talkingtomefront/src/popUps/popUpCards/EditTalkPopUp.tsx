import React, { useState, ChangeEvent, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles, Select, MenuItem } from '@material-ui/core';
import { putTalk } from '../../dataTransfers/DataTalkPost';
import { InitialState } from '../../store/reducers/MainReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatcher } from '../../store/MainDispatcher';
import {
  getQuizzByTalkId,
  getQuizzes,
} from '../../dataTransfers/DataQuizzFetch';
import CustomSnackBar from '../../components/materialUI/CustomSnackBar';

interface IProps {
  talk: any;
  onClose: any;
  open: boolean;
}

interface StateProps {
  userIdRdx: string;
  changeRequestRdx: number;
}

const EditTalkPopUp: React.FC<IProps> = (props) => {
  const [name, setName] = useState(props.talk.name);
  const [description, setDescription] = useState(props.talk.description);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [oldQuizzes, setOldQuizzes] = useState<string[]>([]);

  const id = props.talk.id;

  const { userIdRdx, changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        changeRequestRdx: state.changeRequestRdx,
      };
    },
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const json = [
    {
      id: { id },
      name: { name },
      description: { description },
      selectedQuizzes: { selectedQuizzes },
      oldQuizzes: { oldQuizzes },
    },
  ];

  const onSubmitEdit = () => {
    if (!name) {
      setSnackBarMessage("The talk's name is required");
    } else {
      props.onClose();
      putTalk(json, id);
      rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
    }
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const loadInit = async () => {
    const allUserQuizzData = await getQuizzes(userIdRdx);
    setUserQuizzes(allUserQuizzData);
    const quizzOfTalkData = await getQuizzByTalkId(id);
    setSelectedQuizzes(quizzOfTalkData);
    setOldQuizzes(quizzOfTalkData);
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

  useEffect(() => {
    loadInit();
  }, []);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Editing Talk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Editing a Talk, please enter its name and a description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Talk name"
            type="text"
            value={name}
            required={true}
            error={!!snackBarMessage}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onNameChange(event);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            value={description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onDescriptionChange(event);
            }}
            fullWidth
          />
          <>
            <div>Add one or more quizzes to your talk:</div>
            <Select
              labelId="label"
              id="select"
              value="0"
              onChange={(e: any) =>
                !selectedQuizzes.includes(e.target.value) &&
                onSelectQuizz(String(e.target.value))
              }
              className={classes.select}
            >
              <MenuItem value="0" disabled={true}>
                Select a quizz
              </MenuItem>
              {userQuizzes.map(
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
                {userQuizzes.map(
                  (quizz: any) =>
                    selectedQuizzes.includes(String(quizz.id)) && (
                      <li key={quizz.id}>
                        <Chip
                          label={quizz.name}
                          onDelete={() =>
                            selectedQuizzes.includes(String(quizz.id)) &&
                            onRemoveQuizz(String(quizz.id))
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
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
        {snackBarMessage && (
          <CustomSnackBar message={snackBarMessage} variant="error" />
        )}
      </Dialog>
    </div>
  );
};
export default EditTalkPopUp;
