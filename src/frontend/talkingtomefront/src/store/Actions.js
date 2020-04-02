import * as types from "./ActionsTypes";


export const setcurrentAnswerId = newcurrentAnswerId => ({
    type: types.UPDATE_CURRENTANSWERID_VALUE,
    payload: {
        value: newcurrentAnswerId
    }
});
export const setcurrentAnswer = newcurrentAnswer => ({
    type: types.UPDATE_CURRENTANSWER_VALUE,
    payload: {
        value: newcurrentAnswer
    }
});

export const setQuestionId = newQuestionId => ({
    type: types.UPDATE_QUESTIONID_VALUE,
    payload: {
        value: newQuestionId
    }
});

export const setQuestion = newQuestion => ({
    type: types.UPDATE_QUESTION_VALUE,
    payload: {
        value: newQuestion
    }
});
