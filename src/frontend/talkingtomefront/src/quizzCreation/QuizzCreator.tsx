import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import QuizzQuestion from './QuizzQuestion';
import { RootDispatcher } from '../store/MainDispatcher';
import { InitialState } from '../store/reducers/MainReducer';
import { postQuizz } from '../dataTransfers/DataQuizzPost';
import { TextField } from '@material-ui/core';

interface StateProps {
  questionIdRdx: number;
  questionRdx: Object;
  userIdRdx: string;
  changeRequestRdx: number;
}

export default function QuizzCreator() {
  const [questionsID, setQuestionsId] = useState([0]);
  const [quizzName, setQuizzName] = useState('');
  const [questionsJson, setQuestionsJson] = useState([{}]);
  const {
    questionIdRdx,
    questionRdx,
    userIdRdx,
    changeRequestRdx,
  } = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx,
      userIdRdx: state.userIdRdx,
      changeRequestRdx: state.changeRequestRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    if (questionIdRdx !== -1) {
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

  const PostQuizz = async () => {
    await postQuizz(questionsJson, userIdRdx, quizzName);
    setQuestionsId([0]);
    setQuizzName('');
    setQuestionsJson([{}]);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
    rootDispatcher.setQuestionIdRdx(-1)
  };
  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizzName(event.target.value);
  };

  return (
    <React.Fragment>
      <TextField
        required
        label="Quizz Name"
        fullWidth
        autoComplete="fname"
        className="quizzName"
        onChange={handleQuestionChange}
      />
      <div className="questionsPanel">
        {questionsID.map((qId) => (
          <QuizzQuestion questionId={qId} />
        ))}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Add Question
      </Button>
      <Button variant="outlined" onClick={PostQuizz}>
        Validate Quizz
      </Button>
    </React.Fragment>
  );
}
