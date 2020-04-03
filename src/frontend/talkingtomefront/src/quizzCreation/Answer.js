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
  const [value, setValue] = useState(props.answerId);
  const [show, setShow] = useState(true);
  const currentAnswerRdx = useSelector(state => state.currentAnswer);
  const currentAnswerIdRdx = useSelector(state => state.currentAnswerId);
  const questionIdRdx = useSelector(state => state.questionIdRdx);
  const dispatch = useDispatch();

  const deleteAnswer = event => {
    //setCurrentAnswerRdx(event.target.value);
    //setCurrentAnswerIdRdx(props.questionId)
    setShow(false);
  };

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
  }
}
export default Answer;
