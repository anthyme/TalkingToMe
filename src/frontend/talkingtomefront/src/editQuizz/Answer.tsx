import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InitialState } from '../store/reducers/MainReducer';
import { RootDispatcher } from '../store/MainDispatcher';

interface IProps {
  questionId: number;
  answerIndex: number;
  answer: any;
}
interface StateProps {
  currentAnswerIdRdx: number;
  questionIdRdx: number;
}

const Answer: React.FC<IProps> = (props) => {
  const [value, setValue] = useState(props.answer);
  const { questionIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        currentAnswerIdRdx: state.currentAnswerIdRdx,
        questionIdRdx: state.questionIdRdx,
      };
    },
  );
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    if (questionIdRdx === -1 && value) {
      setValue(props.answer);
    }
  }, [value]);

  const deleteAnswer = async () => {
    await rootDispatcher.setAnswerIdRdx(props.answerIndex);
    await rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx('###---DelAn0982373123---###');
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    rootDispatcher.setAnswerIdRdx(props.answerIndex);
    rootDispatcher.setQuestionIdRdx(props.questionId);
    rootDispatcher.setAnswerRdx(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid item>
        <FormControlLabel
          className="formControlLabel"
          value={value}
          control={<Radio />}
          label=""
        />
        <TextField
          placeholder="Answer"
          inputProps={{ 'aria-label': 'description' }}
          className="answerText"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onInputChange(event);
          }}
        />
        <DeleteIcon
          className="deleteAnswer"
          onClick={deleteAnswer}
          style={{ cursor: 'pointer' }}
        />
      </Grid>
    </React.Fragment>
  );
};
export default Answer;
