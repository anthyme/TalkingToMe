import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as actions from '../store/ActionsTypes';
//import {withSearchValue} from "../enhancers/WithSearchValue";

function Answer(props) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(true);
  const currentAnswerRdx = useSelector(state => state.currentAnswer);
  const currentAnswerIdRdx = useSelector(state => state.currentAnswerId);
  const questionIdRdx = useSelector(state => state.questionId);
  const dispatch = useDispatch();

<<<<<<< HEAD
  const deleteAnswer = (event) => {
    dispatch({ type: actions.UPDATE_CURRENTANSWERID_VALUE, payload : props.answerId});
    dispatch({ type: actions.UPDATE_QUESTIONID_VALUE, payload : props.questionId});
    dispatch({ type: actions.UPDATE_CURRENTANSWER_VALUE, payload : "empty"});
=======
  const deleteAnswer = event => {
    //setCurrentAnswerRdx(event.target.value);
    //setCurrentAnswerIdRdx(props.questionId)
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
    setShow(false);
  };

<<<<<<< HEAD
  const onInputChange =(event) => {
    setValue(event.target.value);
    dispatch({ type: actions.UPDATE_CURRENTANSWERID_VALUE, payload : props.answerId});
    dispatch({ type: actions.UPDATE_QUESTIONID_VALUE, payload : props.questionId});
    dispatch({ type: actions.UPDATE_CURRENTANSWER_VALUE, payload : event.target.value});
  };
  
  switch (show){
      case true:
        return (
            <React.Fragment>
                <Grid item spacing="0">
                    <FormControlLabel  value={value} control={<Radio />}/>
                    <TextField placeholder={"Answer"+props.answerId} inputProps={{ 'aria-label': 'description' }} onChange={event=>{onInputChange(event)}}/>
                    <DeleteIcon onClick = {deleteAnswer} style={{cursor:'pointer'}}/>
                </Grid>
            </React.Fragment>
          );
        case false:
            return <></>;
=======
  const onInputChange = event => {
    console.log(props.answerId);
    setValue(event.target.value);
    dispatch({ type: actions.UPDATE_CURRENTANSWERID_VALUE, payload: '3' });
    console.log(currentAnswerIdRdx);
    //setCurrentAnswerRdx(event.target.value);
    //setCurrentAnswerIdRdx(props.answerId);
    //setQuestionIdRdx(props.questionId);
  };

  switch (show) {
    case true:
      return (
        <React.Fragment>
          <Grid item spacing="0">
            <FormControlLabel value={value} control={<Radio />} />
            <TextField
              placeholder={'Question' + props.answerId}
              inputProps={{ 'aria-label': 'description' }}
              onChange={event => {
                onInputChange(event);
              }}
            />
            <DeleteIcon onClick={deleteAnswer} style={{ cursor: 'pointer' }} />
          </Grid>
          {currentAnswerIdRdx}
        </React.Fragment>
      );
    case false:
      return <></>;
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
  }
}
export default Answer;
