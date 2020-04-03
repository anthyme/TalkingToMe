import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import QuizzQuestion from './QuizzQuestion';

export default function QuizzCreator() {
  const [cardIds, setCardIds] = useState([]);
  const [questionsID, setQuestionsId] = useState([1]);
  const [questionsJson, setQuestionsJson] = useState([{}]);
  const currentAnswerRdx = useSelector(state => state.currentAnswerRdx);
  const questionIdRdx = useSelector(state => state.questionIdRdx);
  const questionRdx = useSelector(state => state.questionIdRdx);

  useEffect(() => {
    console.log('useEffect has been called!');
    let newQuestionJson = questionsJson;
    newQuestionJson[questionIdRdx] = questionRdx;
    setQuestionsJson(newQuestionJson);
  }, [currentAnswerRdx]);

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
  };

  const ChangeId = qId => {
    console.log(qId);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Quizz Creation
      </Typography>
      <div>
        {questionsID.map(qId => (
          <QuizzQuestion
            onClick={qId => {
              ChangeId(qId);
            }}
            questionId={qId}
          />
        ))}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Question
      </Button>
    </React.Fragment>
  );
}
