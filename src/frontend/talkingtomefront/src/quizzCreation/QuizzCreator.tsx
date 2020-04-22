import React, { useState, useEffect ,useCallback, ChangeEvent} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import QuizzQuestion from './QuizzQuestion'
import _ from 'lodash'
import { RootDispatcher } from '../store/MainDispatcher'
import { InitialState } from '../store/reducers/MainReducer'
import * as constants from "../constants"
import {postQuizz} from "../dataTransfers/DataQuizzPost"
import { TextField } from '@material-ui/core'

interface StateProps { 
  questionIdRdx: number,
  questionRdx: Object,
  userIdRdx: string,
  changeRequestRdx: number
}

export default function QuizzCreator() {
  const [cardIds, setCardIds] = useState([])
  const [questionsID, setQuestionsId] = useState([0])
  const [quizzName, setQuizzName] = useState('')
  const [questionsJson, setQuestionsJson] = useState([{}])
  const {questionIdRdx,questionRdx, userIdRdx,changeRequestRdx} = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx,
      userIdRdx: state.userIdRdx,
      changeRequestRdx: state.changeRequestRdx
    }
});
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const debounceRedux = useCallback(_.debounce(setNewQuestion, 1000), []);

  function setNewQuestion() {
    let newQuestionJson = questionsJson;
    newQuestionJson[questionIdRdx] = questionRdx;
    setQuestionsJson(newQuestionJson);
  }

  useEffect(() => {
    if (questionIdRdx!==-1) {
      console.log('creator changed!');
      //debounceRedux();
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

  const ChangeId = (qId: any) => {
    console.log(qId)
  }
  
  const ShowJson = ()=>{
    console.log(questionsJson);
  };

  const PostQuizz = async ()=>{
    await postQuizz(questionsJson, userIdRdx, quizzName);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx+1);
}
 const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setQuizzName(event.target.value)
 }

  return (
    <React.Fragment>
      <TextField
          required
          label="Quizz Name"
          fullWidth
          autoComplete="fname"
          onChange={handleQuestionChange}
      />
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
      <Button variant="outlined" onClick={PostQuizz}>
        Validate Quizz
      </Button>
    </React.Fragment>
  );
}
