import React, { useState, useEffect ,useCallback} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import QuizzQuestion from './QuizzQuestion'
import _ from 'lodash'
import { RootDispatcher } from '../store/MainDispatcher'
import { InitialState } from '../store/reducers/MainReducer'

interface StateProps { 
  currentAnswerRdx: string,
  currentAnswerIdRdx: number,
  questionIdRdx: number,
  questionRdx: Object
}

export default function QuizzCreator() {
  const [cardIds, setCardIds] = useState([])
  const [questionsID, setQuestionsId] = useState([0])
  const [questionsJson, setQuestionsJson] = useState([{}])
  const {currentAnswerRdx, currentAnswerIdRdx,questionIdRdx,questionRdx} = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      currentAnswerRdx: state.currentAnswerRdx,
      currentAnswerIdRdx: state.currentAnswerIdRdx,
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx
    }
});
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);
  /*const questionIdRdx = useSelector(state => state.questionId);
  const questionRdx = useSelector(state => state.question);
  const currentAnswerRdx = useSelector(state => state.currentAnswer);
  const currentAnswerIdRdx = useSelector(state => state.currentAnswerId);*/

  const debounceRedux = useCallback(_.debounce(setNewQuestion, 1000), []);


  function setNewQuestion() {
      let newQuestionJson = questionsJson
      newQuestionJson[questionIdRdx] = questionRdx
      setQuestionsJson(newQuestionJson)
  }

  useEffect(() => {
    if(questionRdx){
      console.log("questions changed");
      debounceRedux();
      let newQuestionJson = questionsJson
      newQuestionJson[questionIdRdx] = questionRdx
      setQuestionsJson(newQuestionJson)
  }
  }, [questionRdx])

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1
    let newTable = [...questionsID, newQuestionId]
    setQuestionsId(newTable)
  }

  const ChangeId = (qId: any) => {
    console.log(qId)
  }
  
  const ShowJson = ()=>{
    console.log(questionRdx);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Quizz Creation
      </Typography>
      <div>
        {questionsID.map(qId => (
          <QuizzQuestion
            questionId={qId}
                />
        ))}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Question
      </Button>
      <Button variant="outlined" onClick={ShowJson}>
        Show Json
      </Button>
    </React.Fragment>
  )
}
