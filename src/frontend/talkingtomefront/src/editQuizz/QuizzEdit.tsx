import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import QuizzQuestionEdit from './QuizzQuestionEdit';
import { RootDispatcher } from '../store/MainDispatcher';
import { InitialState } from '../store/reducers/MainReducer';
import { putQuizz } from '../dataTransfers/DataQuizzPost';
import { TextField } from '@material-ui/core';
import { getQuizzById } from '../dataTransfers/DataQuizzFetch';

interface StateProps {
  questionIdRdx: number;
  questionRdx: Object;
  changeRequestRdx: number;
}
interface IProps{
  quizzId:number;
}

const QuizzEdit: React.FC<IProps> = (props) => {
  const [questionsID, setQuestionsId] = useState([-1]);
  const [quizzName, setQuizzName] = useState('');
  const [questionsJson, setQuestionsJson] = useState([{}]);
  const quizzId = props.quizzId;
  const {
    questionIdRdx,
    questionRdx,
    changeRequestRdx,
  } = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx,
      changeRequestRdx: state.changeRequestRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  function setNewQuestion() {
    let newQuestionJson = questionsJson;
    newQuestionJson[questionIdRdx] = questionRdx;
    setQuestionsJson(newQuestionJson);
  }

  useEffect(() => {
    if (questionIdRdx !== -1) {
      let newQuestionJson = questionsJson;
      newQuestionJson[questionIdRdx] = questionRdx;
      setQuestionsJson(newQuestionJson);
    }
  }, [questionRdx]);

  useEffect(() => {
    getQuizzById(quizzId).then((response)=>{
      console.log(response);
      console.log(questionsJson);
      var count:number = 0;
      response.questions.forEach((element: any) => {
        if(count!==0){
          let newTable = [...questionsID, count];
          let newQuestionJson = questionsJson;
          newQuestionJson.push({});
          newQuestionJson[count] = element;
          setQuestionsId(newTable);
          setQuestionsJson(newQuestionJson);
          count++;
        } else {
          let newQuestionJson = questionsJson;
          newQuestionJson[count] = element;
          setQuestionsJson(newQuestionJson);
          setQuestionsId([0]);
          count++;
        }
      });  
      console.log(questionsJson);
    })
      ;

  }, []); 

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
  };
;

  const PutQuizz = async () => {
    await putQuizz(questionsJson, 1);
    setQuestionsId([0]);
    setQuizzName('');
    setQuestionsJson([{}]);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
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
          <QuizzQuestionEdit questionId={qId} questionsJson={questionsJson[questionsID.indexOf(qId)]}/>
        ))}
      </div>
      <Button variant="outlined" onClick={AddNewQuestion}>
        Add Question
      </Button>
      <Button variant="outlined" onClick={PutQuizz}>
        Validate Quizz
      </Button>
    </React.Fragment>
  );
}
export default QuizzEdit;