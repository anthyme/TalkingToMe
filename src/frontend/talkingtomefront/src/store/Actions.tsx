import * as types from './ActionsTypes';

export const setcurrentAnswerId = (newcurrentAnswerId : number) => ({
  type: types.UPDATE_CURRENTANSWERID_VALUE,
  payload: {
    value: newcurrentAnswerId,
  },
});
export const setcurrentAnswer = (newcurrentAnswer: Object) => ({
  type: types.UPDATE_CURRENTANSWER_VALUE,
  payload: {
    value: newcurrentAnswer,
  },
});

export const setQuestionId = (newQuestionId: Number) => ({
  type: types.UPDATE_QUESTIONID_VALUE,
  payload: {
    value: newQuestionId,
  },
});

export const setQuestion = (newQuestion:Object) => ({
  type: types.UPDATE_QUESTION_VALUE,
  payload: {
    value: newQuestion,
  },
});
