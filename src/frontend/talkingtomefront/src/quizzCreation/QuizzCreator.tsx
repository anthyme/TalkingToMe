import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import QuizzQuestion from './QuizzQuestion';
import _ from 'lodash';

export default function QuizzCreator() {
  const [questionsID, setQuestionsId] = useState([0]);
  const [questionsJson, setQuestionsJson] = useState([{}]);

  const questionIdRdx = useSelector((state) => state.questionId);
  const questionRdx = useSelector((state) => state.question);

  const debounceRedux = useCallback(_.debounce(setNewQuestion, 1000), []);

  function setNewQuestion() {
    let newQuestionJson = questionsJson;
    newQuestionJson[questionIdRdx] = questionRdx;
    setQuestionsJson(newQuestionJson);
  }

  useEffect(() => {
    if (questionRdx) {
      console.log('questions changed');
      debounceRedux();
      let newQuestionJson = questionsJson;
      newQuestionJson[questionIdRdx] = questionRdx;
      setQuestionsJson(newQuestionJson);
    }
  }, [questionRdx]);

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
  };

  const ShowJson = () => {
    console.log(questionRdx);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Quizz Creation
      </Typography>
      <div>
        {questionsID.map((qId) => (
          <QuizzQuestion questionId={qId} />
        ))}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Question
      </Button>
      <Button variant="outlined" onClick={ShowJson}>
        Show Json
      </Button>
    </React.Fragment>
  );
}
