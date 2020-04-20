import React, { useState, useEffect ,useCallback, SetStateAction} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import QuizzQuestionEdit from './QuizzQuestionEdit'
import _ from 'lodash'
import { RootDispatcher } from '../store/MainDispatcher'
import { InitialState } from '../store/reducers/MainReducer'
import { getQuizz } from "../dataTransfers/DataTalkFetch"
import * as constants from "../constants"
import { putQuizz } from '../dataTransfers/DataQuizzPost'
import { putTalk } from '../dataTransfers/DataTalkPost'

interface StateProps { 
  currentAnswerRdx: string,
  currentAnswerIdRdx: number,
  questionIdRdx: number,
  questionRdx: any
}

export default function QuizzEdit() {
  const [cardIds, setCardIds] = useState([])
  const [title, setTitle] = useState("")
  const [quizzId, setQuizzId] = useState(0)
  const [questionsID, setQuestionsId] = useState([0])
  const [questionsJson, setQuestionsJson] = useState([{id:1}])
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

  const debounceRedux = useCallback(_.debounce(setNewQuestion, 1000), []);

  function setNewQuestion() {
    let newQuestionJson = questionsJson;
    newQuestionJson[questionIdRdx] = questionRdx;
    setQuestionsJson(newQuestionJson);
  }

  const handleTitleChange = (event:any) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (questionIdRdx!==-1) {
      console.log('creator changed!');
      //debounceRedux();
      let newQuestionJson = questionsJson;
      newQuestionJson[questionIdRdx] = questionRdx;
      setQuestionsJson(newQuestionJson);
    }
  }, [questionRdx]);

  useEffect(() => {
    //TODO - Change to edited id
    getQuizz(1).then((json)=>{
      setQuestionsJson(json.Questions);
      setQuizzId(json.Id)
    });
    let first = [0];
    setQuestionsId(first);
    for(let i=1; i<questionsJson.length;i++){
      let newTable = [...questionsID, i];
      setQuestionsId(newTable);
    }
    console.log("questionsId table:" + questionsID)
}, []);


  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
  };

  const ChangeId = (qId: any) => {
    console.log(qId);
  }
  
  const ShowJson = ()=>{
    console.log(questionsJson);
  };

  const PutQuizz = ()=>{
    putQuizz(questionsJson,quizzId);
  }


  return (
    <React.Fragment>
      <TextField
                    required
                    label="Quizz Title"
                    fullWidth
                    autoComplete="fname"
                    value = {title}
                    onChange={handleTitleChange}
                  />
      <div>
        {questionsID.map((qId) => {
          return(
            <QuizzQuestionEdit questionId={qId}  qJson={questionsJson[qId]}/>
          );
  })}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Question
      </Button>
      <Button variant="outlined" onClick={ShowJson}>
        Show Json
      </Button>
      <Button variant="outlined" onClick={PutQuizz}>
        Validate Quizz
      </Button>
    </React.Fragment>
  );
}
