import React,{useState} from 'react';
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
  const AddNewQuestion =() => {
    let newQuestionId = questionsID[questionsID.length -1]+1;
    let newTable = [...questionsID, newQuestionId];
    setQuestionsId(newTable);
};
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Quizz Creation
      </Typography>
        <div>
            {questionsID.map(qId => <QuizzQuestion questionId={qId} />)}
        </div>
        <Button variant="outlined" onClick={AddNewQuestion}>Question</Button>
    </React.Fragment>
  );
}