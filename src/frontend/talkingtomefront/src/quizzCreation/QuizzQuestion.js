import React,{useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Answer from './Answer'


export default function QuizzQuestion(questionName) {
  const [answersId, setAnswersId] = useState([1,2,3]);
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('UCQ');

  const handleQuestionTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };
  const AddNewAnswer =() => {
      let newQuestionId = answersId[answersId.length -1]+1;
      let newTable = [...answersId, newQuestionId];
      setAnswersId(newTable);
  };
  switch (selectedValue){
    case "UCQ":
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
                        <TextField value = "question Type :"/>
                        <Grid item xs={1}>
                        <RadioGroup  name="gender1" value={selectedValue} onChange={handleQuestionTypeChange}>
                            <FormControlLabel value="UCQ" control={<Radio />} label="UCQ" />
                            <FormControlLabel value="Text" control={<Radio />} label="Text" />
                        </RadioGroup>
                        </Grid>
            </div>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                            <div>
                                {answersId.map(qId => <Answer questionId={qId} />)}
                            </div>
                        </RadioGroup>
                        <Button variant="outlined" onClick={AddNewAnswer}>Add Answer</Button>
                    </Grid>
                    
                </Grid>
            </Paper>
            </React.Fragment>
          );
    case "Text":
        return(
        
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
                        <TextField value = "question Type :"/>
                        <Grid item xs={1}>
                        <RadioGroup  name="gender1" value={selectedValue} onChange={handleQuestionTypeChange}>
                            <FormControlLabel value="UCQ" control={<Radio />} label="UCQ" />
                            <FormControlLabel value="Text" control={<Radio />} label="Text" />
                        </RadioGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
          );
        default:
            return null;
}
 
}