import React,{useState} from 'react';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function QuizzQuestion(questionName) {
  const [cardIds, setCardIds] = useState([]);
  const [value, setValue] = useState('1');

  const onInputChange =(event) => {
    console.log(value);
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
        <Grid item spacing="0">
            <FormControlLabel  value={value} control={<Radio />}/>
            <TextField placeholder="Answer1" inputProps={{ 'aria-label': 'description' }} onChange={event=>{onInputChange(event)}}/>
        </Grid>
    </React.Fragment>
  );
}