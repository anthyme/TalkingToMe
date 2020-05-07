import * as actions from '../ActionsTypes';
import { Action, Reducer } from 'redux';
export interface InitialState {
  currentAnswerRdx: string;
  currentAnswerIdRdx: number;
  questionIdRdx: number;
  questionRdx: Object;
  userIdRdx: string;
  changeRequestRdx: number;
  tokenIdRdx: string;
}
const initialState: InitialState = {
  currentAnswerRdx: '',
  currentAnswerIdRdx: 0,
  questionIdRdx: -1,
  questionRdx: { Name: 'QuizzTest' },
  userIdRdx: '-1',
  changeRequestRdx: 0,
  tokenIdRdx: "",
};

export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

export const mainReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === actions.UPDATE_CURRENTANSWERID_VALUE) {
    return {
      ...state,
      currentAnswerIdRdx: action.payload.currentAnswerIdRdx || 0,
    };
  } else if (action.type === actions.UPDATE_CURRENTANSWER_VALUE) {
    return {
      ...state,
      currentAnswerRdx: action.payload.currentAnswerRdx || '',
    };
  } else if (action.type === actions.UPDATE_QUESTIONID_VALUE) {
    return { ...state, questionIdRdx: action.payload.questionIdRdx || 0 };
  } else if (action.type === actions.UPDATE_QUESTION_VALUE) {
    return { ...state, questionRdx: action.payload.questionRdx || {} };
  } else if (action.type === actions.UPDATE_USERID_VALUE) {
    return { ...state, userIdRdx: action.payload.userIdRdx || '' };
  } else if (action.type === actions.UPDATE_CHANGEREQUEST_VALUE) {
    return { ...state, changeRequestRdx: action.payload.changeRequestRdx || 0 };
  } else if (action.type === actions.UPDATE_TOKENID_VALUE) {
    return { ...state, tokenIdRdx: action.payload.tokenIdRdx || "" };
  } else return state;
};
