import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as actions from '../store/ActionsTypes';
import { InitialState } from '../store/reducers/MainReducer';
import { Action } from 'redux';
import { RootDispatcher } from '../store/MainDispatcher';
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface IProps {
  answerId: number,
  answer: any,
  questionId: number
}
interface StateProps { 
  currentAnswerRdx: string,
  currentAnswerIdRdx: number,
  questionIdRdx: number | null,
  questionRdx: Object
}

const Answer: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(true);
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
  //const currentAnswerRdx = useSelector((state) => state.currentAnswer);
  //const currentAnswerIdRdx = useSelector((state) => state.currentAnswerId);
  //const questionIdRdx = useSelector((state) => state.questionId);


  const deleteAnswer = () => {
    rootDispatcher.setAnswerIdRdx(props.answerId);
    rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx("");
    setShow(false);
  };

  const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    rootDispatcher.setAnswerIdRdx(props.answerId);
    rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx(event.target.value);
  };

  switch (show) {
    case true:
      return (
        <React.Fragment>
          <Grid item>
            <FormControlLabel value={value} control={<Radio />} label="label" />
            <TextField
              placeholder={'Answer' + props.answerId}
              inputProps={{ 'aria-label': 'description' }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onInputChange(event);
              }}
            />
            <DeleteIcon onClick={deleteAnswer} style={{ cursor: 'pointer' }} />
          </Grid>
        </React.Fragment>
      );
    case false:
      return <></>;
  }
}
export default Answer;
