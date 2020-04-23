import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Answer from './Answer';
import * as actions from '../store/ActionsTypes';
import _ from 'lodash';
import { CardActions } from '@material-ui/core';
import { InitialState } from '../store/reducers/MainReducer';
import { RootDispatcher } from '../store/MainDispatcher';
//hello
interface IProps {
  questionId: number;
}

interface StateProps {
  currentAnswerRdx: string;
  currentAnswerIdRdx: number;
  questionIdRdx: number;
  questionRdx: Object;
}
//TODO - Keep changes upon revert, aka : Num of questions & content of each question
const QuizzQuestion: React.FC<IProps> = (props) =>  {
  const [value, setValue] = useState(undefined);
  const [questionValue, setQuestionValue] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('UCQ');
  const [show, setShow] = useState(true);
  const [answersId, setAnswersId] = useState([0, 1]);
  const [answers, setAnswers] = useState(['', '']);

  const {
    currentAnswerRdx,
    currentAnswerIdRdx,
    questionIdRdx,
  } = useSelector<InitialState, StateProps>((state: InitialState) => {
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

  const deleteQuestion = (event: any) => {
    //TODO - Change json to empty on quizzcreator
    rootDispatcher.setQuestionRdx({});
    setShow(false);
  };

  const handleQuestionTypeChange = (event: any) => {
    setSelectedValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
  };

  const deleteAnswer = (index:number) =>{
    const answerId = answersId.indexOf(currentAnswerIdRdx);
    const resultAnswers = answers;
    resultAnswers.splice(answerId,1);
    const resultAnswersId = answersId;
    resultAnswersId.splice(answerId,1);
    setAnswers(resultAnswers);
    setAnswersId(resultAnswersId);
  };

  const handleRadioChange = (event: any) => {
    setValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
  };

  const handleQuestionChange = (event: any) => {
    setQuestionValue(event.target.value);
    rootDispatcher.setQuestionIdRdx(props.questionId);
    console.log(value);
  };

  const addNewAnswer = () => {
    let newQuestionId;
    if(answersId.length !==0){
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

  useEffect(() => {
    if (props.questionId === questionIdRdx && questionIdRdx !== -1) {
      if(currentAnswerRdx==='###---DelAn0982373123---###'){
        deleteAnswer(currentAnswerIdRdx);
      } else {
        let newAnswers = answers;
        newAnswers[answersId.indexOf(currentAnswerIdRdx)] = currentAnswerRdx;
        let newJson = questionJson;
        setAnswers(newAnswers);
        rootDispatcher.setQuestionRdx(newJson);
    }
  }
  }, [currentAnswerRdx,currentAnswerIdRdx, questionValue, value]);

  if (show === true) {
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
                </Grid>
                <Grid item xs={12}>
                  <p>Write all the possible answers and tick the correct one</p>
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <div>
                      {answersId.map((qId, index: number) => (
                        <Answer
                          questionId={props.questionId}
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
export default QuizzQuestion; // = withSearchValue(QuizzQuestion);
