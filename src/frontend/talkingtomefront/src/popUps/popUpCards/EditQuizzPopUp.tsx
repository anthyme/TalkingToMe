import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QuizzEdit from '../../editQuizz/QuizzEdit';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../../store/reducers/MainReducer';
import { RootDispatcher } from '../../store/MainDispatcher';
import { putQuizz } from '../../dataTransfers/Posts/DataQuizzPost';
import { getQuizzById } from '../../dataTransfers/Fetchs/DataQuizzFetch';
import { createQJson } from '../../dataTransfers/jsonCreators/CreateJson';
import {
  TextField,
  IconButton,
  Icon,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CustomSnackBar from '../../components/materialUI/CustomSnackBar';

interface IProps {
  quizz: any;
  onClose: any;
  open: boolean;
}

interface StateProps {
  questionIdRdx: number;
  questionRdx: Object;
  changeRequestRdx: number;
}

const EditQuizzPopUp: React.FC<IProps> = (props) => {
  const [questionsID, setQuestionsId] = useState([0]);
  const [questionsJson, setQuestionsJson] = useState([{}]);
  const [quizzName, setQuizzName] = useState('');
  const [baseQuestions, setBaseQuestions] = useState([0]);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const quizzId = props.quizz.id;
  const { questionIdRdx, questionRdx, changeRequestRdx } = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx,
      changeRequestRdx: state.changeRequestRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const PutQuizz = async () => {
    await putQuizz(questionsJson, quizzId, quizzName);
    setQuestionsId([0]);
    setQuizzName('');
    setQuestionsJson([{}]);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
  };

  useEffect(() => {
    if (questionIdRdx !== -1) {
      let newQuestionJson = questionsJson;
      newQuestionJson[questionIdRdx] = questionRdx;
      setQuestionsJson(newQuestionJson);
    }
  }, [questionRdx]);

  useEffect(() => {
    getQuizzById(quizzId).then((response) => {
      var count: number = 0;
      setQuizzName(response.name);
      response.questions.forEach((element: any) => {
        if (count !== 0) {
          let newTable = [...questionsID, count];
          let newQuestionJson = questionsJson;
          newQuestionJson.push({});
          newQuestionJson[count] = createQJson(element);
          setQuestionsId(newTable);
          setQuestionsJson(newQuestionJson);
          var baseQTable = [...baseQuestions, element.id];
          setBaseQuestions(baseQTable);
          count++;
        } else {
          let newQuestionJson = questionsJson;
          newQuestionJson[count] = createQJson(element);
          setQuestionsJson(newQuestionJson);
          setQuestionsId([0]);
          setBaseQuestions([element.id]);
          count++;
        }
      });
      console.log(questionsJson);
    });
  }, []);

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
    rootDispatcher.setQuestionIdRdx(newQuestionId);
  };

  const handleClose = () => {
    props.onClose();
    rootDispatcher.setAnswerIdRdx(-1);
    rootDispatcher.setQuestionIdRdx(-1);
  };

  const onSubmitEdit = () => {
    if (!quizzName || !questionsJson) {
      setSnackBarMessage("The quizz's name is required");
    } else {
      PutQuizz();
      rootDispatcher.setAnswerIdRdx(-1);
      rootDispatcher.setQuestionIdRdx(-1);
      props.onClose();
    }
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizzName(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    quizzName: {
      marginBottom: '5%',
    },
    popUpActions: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '0px',
    },
    cancSubm: {
      paddingTop: '7%',
    },
    addButton: {
      marginBottom: '7%',
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Editing Quizz</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            label="Quizz Name"
            value={quizzName}
            autoComplete="fname"
            className={classes.quizzName}
            onChange={handleQuestionChange}
            error={!quizzName && !!snackBarMessage}
          />
          <QuizzEdit questionsID={questionsID} questionsJson={questionsJson} />
        </DialogContent>
        <DialogActions className={classes.popUpActions}>
          <Tooltip
            title={'Add Question'}
            placement="left"
            className={classes.addButton}
          >
            <IconButton
              aria-label="delete"
              className="deleteButton"
              onClick={AddNewQuestion}
            >
              <AddCircleOutlineIcon style={{ color: green[500] }}>
                add_circle
              </AddCircleOutlineIcon>
            </IconButton>
          </Tooltip>
          <div className={classes.cancSubm}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onSubmitEdit} color="primary">
              Submit
            </Button>
          </div>
        </DialogActions>
        {snackBarMessage && (
          <CustomSnackBar message={snackBarMessage} variant="error" />
        )}
      </Dialog>
    </div>
  );
};
export default EditQuizzPopUp;
