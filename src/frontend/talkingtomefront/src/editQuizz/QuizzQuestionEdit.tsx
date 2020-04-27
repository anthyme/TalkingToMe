import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Answer from './Answer';
import { InitialState } from '../store/reducers/MainReducer';
import { RootDispatcher } from '../store/MainDispatcher';
//hello
interface IProps {
  questionId: number;
  questionsJson: any;
  
}

interface StateProps {
  currentAnswerRdx: string;
  currentAnswerIdRdx: number;
  questionIdRdx: number;
}
//TODO - Keep changes upon revert, aka : Num of questions & content of each question
const QuizzQuestionEdit: React.FC<IProps> = (props) => {
  const [value, setValue] = useState(undefined);
  const [questionValue, setQuestionValue] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('UCQ');
  const [show, setShow] = useState(true);
  const [updateEnd, setUpdateEnd] = useState(false);
  const [answersId, setAnswersId] = useState([0, 1]);
  const [answers, setAnswers] = useState(['', '']);
  const questionsJson = props.questionsJson;

  const { currentAnswerRdx, currentAnswerIdRdx, questionIdRdx } = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      currentAnswerRdx: state.currentAnswerRdx,
      currentAnswerIdRdx: state.currentAnswerIdRdx,
      questionIdRdx: state.questionIdRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const questionJson = {
    question: { questionValue },
    type: { selectedValue },
    answers: { answers },
    rightAnswer: { value },
  };

  const ShowJson = () => {
    console.log(questionJson);
  };

  const deleteQuestion = (event: any) => {
    rootDispatcher.setQuestionRdx({});
    setShow(false);
  };

  const handleQuestionTypeChange = (event: any) => {
    setSelectedValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
  };

  // Delete first Element in answers and answersId, sets redux to -1
  const deleteAnswer = (index: number) => {
    const answerId = answersId.indexOf(currentAnswerIdRdx);
    const resultAnswers = answers;
    resultAnswers.splice(answerId, 1);
    const resultAnswersId = answersId;
    resultAnswersId.splice(answerId, 1);
    setAnswers(resultAnswers);
    setAnswersId(resultAnswersId);
    rootDispatcher.setAnswerIdRdx(-1);
  };

  const handleRadioChange = (event: any) => {
    setValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
  };

  const handleQuestionChange = (event: any) => {
    setQuestionValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
  };

  const addNewAnswer = () => {
    let newQuestionId;
    if (answersId.length !== 0) {
      newQuestionId = answersId[answersId.length - 1] + 1;
    } else {
      newQuestionId = 0;
    }
    let newTable = [...answersId, newQuestionId];
    let newAnswersJson = '';
    let newAnswers = [...answers, newAnswersJson];
    setAnswersId(newTable);
    setAnswers(newAnswers);
  };

  //setup of answers
  useEffect(() => {
    if (
      props.questionId === questionIdRdx &&
      questionIdRdx !== -1 &&
      currentAnswerIdRdx !== -1
    ) {
      if (currentAnswerRdx === '###---DelAn0982373123---###') {
        deleteAnswer(currentAnswerIdRdx);
      } else {
        let newAnswers = answers;
        newAnswers[answersId.indexOf(currentAnswerIdRdx)] = currentAnswerRdx;
        let newJson = questionJson;
        setAnswers(newAnswers);
        rootDispatcher.setQuestionRdx(newJson);
      }
    }
  }, [currentAnswerRdx, currentAnswerIdRdx, questionValue, value]);

  
  const loadQuestionJson = (json:any) => {
    let setZero = [];
    console.log(questionsJson.answers.length+" for question: "+ props.questionId)
    for(var i=0; i<questionsJson.answers.length;i++){
      setZero.push(i);
    }
    setAnswersId(setZero);
    setQuestionValue(questionsJson.question);
    setSelectedValue(questionsJson.type);
    setValue(questionsJson.correctAn);
    setAnswers(questionsJson.answers);
    setUpdateEnd(true);
  }
  useEffect(() => {
    if (questionIdRdx === -1 && questionsJson.answers!==undefined) {
      loadQuestionJson(questionsJson);
    } else if(questionIdRdx>-1) {
      setUpdateEnd(true);
    }
  }, [questionsJson]);
  

  if (show === true && updateEnd===true) {
    switch (selectedValue) {
      case 'UCQ':
        return (
          <React.Fragment>
            <Paper variant="outlined">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id={props.questionId.toString()}
                    name={questionValue}
                    value={questionValue}
                    label="Question"
                    fullWidth
                    className="questionText"
                    autoComplete="fname"
                    onChange={handleQuestionChange}
                  />
                  <div>
                    <div>Question Type</div>
                    <Grid item xs={1}>
                      <RadioGroup
                        name="gender1"
                        value={selectedValue}
                        onChange={handleQuestionTypeChange}
                      >
                        <FormControlLabel
                          value="UCQ"
                          control={<Radio />}
                          label="UCQ"
                        />
                        <FormControlLabel
                          value="Text"
                          control={<Radio />}
                          label="Text"
                        />
                      </RadioGroup>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p>Write all the possible answers and tick the correct one</p>
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <div className="answersPanel">
                      {answersId.map((qId) => (
                        <Answer
                          questionId={props.questionId}
                          answer = {answers[answersId.indexOf(qId)]}
                          answerIndex={qId}
                        />
                      ))}
                    </div>
                  </RadioGroup>
                  <Button variant="outlined" onClick={addNewAnswer}>
                    Add Answer
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteQuestion}
                  >
                    Delete Question
                  </Button>
                  <Button variant="outlined" onClick={ShowJson}>
                    Json
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </React.Fragment>
        );
      case 'Text':
        return (
          <React.Fragment>
            <Paper variant="outlined">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id={props.questionId.toString()}
                    name={questionValue}
                    value={questionValue}
                    label="Question"
                    fullWidth
                    autoComplete="fname"
                    onChange={handleQuestionChange}
                  />
                  <div>
                    <div>Question Type</div>
                    <Grid item xs={1}>
                      <RadioGroup
                        name="gender1"
                        value={selectedValue}
                        onChange={handleQuestionTypeChange}
                      >
                        <FormControlLabel
                          value="UCQ"
                          control={<Radio />}
                          label="UCQ"
                        />
                        <FormControlLabel
                          value="Text"
                          control={<Radio />}
                          label="Text"
                        />
                      </RadioGroup>
                    </Grid>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteQuestion}
                  >
                    Delete Question
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </React.Fragment>
        );
      default:
        return null;
    }
  } else {
    return <></>;
  }
};
export default QuizzQuestionEdit;
