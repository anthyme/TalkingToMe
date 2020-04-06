"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types = __importStar(require("./ActionsTypes"));
exports.setcurrentAnswerId = function (newcurrentAnswerId) { return ({
    type: types.UPDATE_CURRENTANSWERID_VALUE,
    payload: {
        value: newcurrentAnswerId,
    },
}); };
exports.setcurrentAnswer = function (newcurrentAnswer) { return ({
    type: types.UPDATE_CURRENTANSWER_VALUE,
    payload: {
        value: newcurrentAnswer,
    },
}); };
exports.setQuestionId = function (newQuestionId) { return ({
    type: types.UPDATE_QUESTIONID_VALUE,
    payload: {
        value: newQuestionId,
    },
}); };
exports.setQuestion = function (newQuestion) { return ({
    type: types.UPDATE_QUESTION_VALUE,
    payload: {
        value: newQuestion,
    },
}); };
