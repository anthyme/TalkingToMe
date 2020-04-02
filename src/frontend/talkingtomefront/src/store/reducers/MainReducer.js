import * as actions from "../ActionsTypes";
const initialState = {
    currentAnswer: {},
    currentAnswerId: '23 ',
    questionId:'',
    question: {}
   
};

export const mainreducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.UPDATE_CURRENTANSWERID_VALUE:
            return { ...state, currentAnswerId: payload };
        case actions.UPDATE_CURRENTANSWER_VALUE:
            return { ...state, currentAnswer: payload.value };
        case actions.UPDATE_QUESTIONID_VALUE:
            return { ...state, questionId: payload.value };
        case actions.UPDATE_QUESTION_VALUE:
            return { ...state, question: payload.value };
        default:
            return state;
    }
};
