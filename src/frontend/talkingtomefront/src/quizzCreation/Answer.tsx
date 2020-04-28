import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InitialState } from '../store/reducers/MainReducer';
import { RootDispatcher } from '../store/MainDispatcher';
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface IProps {
  questionId: number;
  answerIndex: number;
}
interface StateProps {
  currentAnswerIdRdx: number;
}

const Answer: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(true);
  const {
    currentAnswerIdRdx,
  } = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      currentAnswerIdRdx: state.currentAnswerIdRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const deleteAnswer = async () => {
    await rootDispatcher.setAnswerIdRdx(props.answerIndex);
    await rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx('###---DelAn0982373123---###');
    //setShow(false);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    rootDispatcher.setAnswerIdRdx(props.answerIndex);
    rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx(event.target.value);
  };

  switch (show) {
    case true:
      return (
        <React.Fragment>
          <Grid item>
            <FormControlLabel className ="formControlLabel" value={value} control={<Radio />} label="" />
            <TextField
              placeholder='Answer'
              inputProps={{ 'aria-label': 'description' }}
              className="answerText"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onInputChange(event);
              }}
            />
            <DeleteIcon className="deleteAnswer" onClick={deleteAnswer} style={{ cursor: 'pointer' }} />
          </Grid>
        </React.Fragment>
      );
    case false:
      return <></>;
  }
};
export default Answer;
