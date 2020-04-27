import React, { useState, ChangeEvent, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { putTalk } from '../../dataTransfers/DataTalkPost';
import { InitialState } from '../../store/reducers/MainReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatcher } from '../../store/MainDispatcher';
import {
  getQuizzByTalkId,
  getQuizzes,
} from '../../dataTransfers/DataQuizzFetch';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

interface IProps {
  talk: any;
}

interface StateProps {
  userIdRdx: string;
  changeRequestRdx: number;
}

const EditTalkPopUp: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.talk.name);
  const [description, setDescription] = useState(props.talk.description);
  const [id, setId] = useState(props.talk.id);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [checkedQuizzes, setCheckedQuizzes] = useState<string[]>([]);
  const [oldQuizzes, setOldQuizzes] = useState<string[]>([]);

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
      checkedQuizzes: { checkedQuizzes },
      oldQuizzes: { oldQuizzes },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitEdit = () => {
    setOpen(false);
    putTalk(json, id);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
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
    setCheckedQuizzes(quizzOfTalkData);
    setOldQuizzes(quizzOfTalkData);
  };

  const onCheckQuizz = async (value: string) => {
    if (checkedQuizzes.includes(value)) {
      setCheckedQuizzes(checkedQuizzes.filter((val) => val !== value));
    } else {
      setCheckedQuizzes([...checkedQuizzes, value]);
    }
  };

  useEffect(() => {
    open && loadInit();
  }, [open]);

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editing Talk</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Talk name"
            type="text"
            value={name}
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
            <FormGroup>
              {userQuizzes.map(
                (quizz: any) =>
                  quizz.name && (
                    <FormControlLabel
                      control={<Checkbox value={quizz.id} color="primary" />}
                      label={quizz.name}
                      key={quizz.id}
                      onChange={(e: any) => onCheckQuizz(e.target.value)}
                      checked={checkedQuizzes.includes(String(quizz.id))}
                    />
                  ),
              )}
            </FormGroup>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditTalkPopUp;
