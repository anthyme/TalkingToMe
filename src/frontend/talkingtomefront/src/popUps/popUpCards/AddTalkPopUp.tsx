import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Paper,
  Chip,
  makeStyles,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../../store/reducers/MainReducer';
import { useHistory } from 'react-router-dom';
import {
  getTalks,
  getTalksByQuizzId,
} from '../../dataTransfers/Fetchs/DataTalkFetch';
import { putTalksToQuizz } from '../../dataTransfers/Posts/DataQuizzPost';
import { RootDispatcher } from '../../store/MainDispatcher';

interface IProps {
  quizz: any;
  onClose: any;
  open: boolean;
}

interface StateProps {
  userIdRdx: string;
  changeRequestRdx: number;
  tokenIdRdx: string;
}

const AddTalkPopUp: React.FC<IProps> = (props) => {
  const [userTalks, setUserTalks] = useState([]);
  const [selectedTalks, setSelectedTalks] = useState<string[]>([]);
  const [oldTalks, setOldTalks] = useState<string[]>([]);

  const quizzId = props.quizz.id;
  const history = useHistory();

  const { userIdRdx, changeRequestRdx , tokenIdRdx} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        changeRequestRdx: state.changeRequestRdx,
        tokenIdRdx: state.tokenIdRdx
      };
    },
  );
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const jsonTTQ = [
    {
      quizzId: { quizzId },
      selectedTalks: { selectedTalks },
      oldTalks: { oldTalks },
    },
  ];

  const onSubmitEdit = () => {
    props.onClose();
    putTalksToQuizz(jsonTTQ, tokenIdRdx);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
  };

  const onSelectTalk = (value: string) => {
    setSelectedTalks([...selectedTalks, value]);
  };

  const onRemoveTalk = (value: string) => {
    setSelectedTalks(selectedTalks.filter((val) => val !== value));
  };

  useEffect(() => {
    if (userIdRdx === '-1') {
      history.push('/');
    }
    let userId = userIdRdx;
    getTalks(userId,tokenIdRdx).then((json) => {
      setUserTalks(json);
    });
    getTalksByQuizzId(quizzId,tokenIdRdx).then((json) => {
      setSelectedTalks(json);
      setOldTalks(json);
    });
  }, [history, userIdRdx, quizzId]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    addTalkDiv: {
      marginBottom: '1%',
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    select: {
      marginBottom: '1%',
    },
  }));
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Talks linked to this quizz
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.addTalkDiv}>
          Add one or more quizzes to your talk:
        </DialogContentText>
        <Select
          labelId="label"
          id="select"
          value="0"
          onChange={(e: any) =>
            !selectedTalks.includes(String(e.target.value)) &&
            onSelectTalk(String(e.target.value))
          }
          className={classes.select}
        >
          <MenuItem value="0" disabled={true}>
            Select a Talk
          </MenuItem>
          {userTalks.map(
            (talk: any) =>
              talk.name && (
                <MenuItem value={talk.id} key={talk.id}>
                  {talk.name}
                </MenuItem>
              ),
          )}
        </Select>
        {selectedTalks.length > 0 && (
          <Paper component="ul" className={classes.root}>
            {userTalks.map(
              (talk: any) =>
                selectedTalks.includes(String(talk.id)) && (
                  <li key={talk.id}>
                    <Chip
                      label={talk.name}
                      onDelete={() =>
                        selectedTalks.includes(String(talk.id)) &&
                        onRemoveTalk(String(talk.id))
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmitEdit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTalkPopUp;
