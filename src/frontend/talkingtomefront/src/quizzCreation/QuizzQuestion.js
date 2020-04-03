import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withSearchValue } from '../enhancers/WithSearchValue';
import Answer from './Answer';
import QuizzCreator from './QuizzCreator';
//TODO - Keep changes upon revert, aka : Num of questions & content of each question

function QuizzQuestion(questionName) {
  const [answersId, setAnswersId] = useState([1, 2]);
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('UCQ');
  const [show, setShow] = useState(true);
  const [answers, setAnswers] = useState([{}, {}]);
  const setQuestionRdx = useSelector(state => state.setQuestionRdx);
  const currentAnswerRdx = useSelector(state => state.currentAnswerRdx);
  const currentAnswerIdRdx = useSelector(state => state.currentAnswerIdRdx);

  const deleteQuestion = event => {
    setShow(false);
  };

  const handleQuestionTypeChange = event => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChange = event => {
    setValue(event.target.value);
    console.log(value);
  };

  const addNewAnswer = () => {
    let newQuestionId = answersId[answersId.length - 1] + 1;
    let newTable = [...answersId, newQuestionId];
    let newAnswersJson = {};
    let newAnswers = [...answers, newAnswersJson];
    setAnswersId(newTable);
    setAnswers(newAnswers);
  };

  const questionJson = {
    name: { questionName },
    type: { selectedValue },
    answers: { answers },
    rightAnswer: { value },
  };

  useEffect(() => {
    console.log('Changing Question Json!');
    let newAnswers = answers;
    newAnswers[currentAnswerIdRdx] = currentAnswerRdx;
    setAnswers(newAnswers);
    //setQuestionRdx(questionJson);
  }, [currentAnswerRdx]);

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
                    id={questionName}
                    name={questionName}
                    label="Question"
                    value=""
                    fullWidth
                    autoComplete="fname"
                  />
                  <div>
                    <TextField value="question Type :" />
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
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <div>
                      {answersId.map(qId => (
                        <Answer answerId={qId} questionId={questionName} />
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
                    id={questionName}
                    name={questionName}
                    label="Question"
                    value=""
                    fullWidth
                    autoComplete="fname"
                  />
                  <div>
                    <TextField value="question Type :" />
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
}
export default QuizzQuestion; // = withSearchValue(QuizzQuestion);
