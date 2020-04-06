"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions = __importStar(require("../ActionsTypes"));
var initialState = {
    currentAnswer: {},
    currentAnswerId: '23 ',
    questionId: '1',
    question: {}
};
exports.mainreducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions.UPDATE_CURRENTANSWERID_VALUE:
            return __assign(__assign({}, state), { currentAnswerId: payload });
        case actions.UPDATE_CURRENTANSWER_VALUE:
            return __assign(__assign({}, state), { currentAnswer: payload });
        case actions.UPDATE_QUESTIONID_VALUE:
            return __assign(__assign({}, state), { questionId: payload });
        case actions.UPDATE_QUESTION_VALUE:
            return __assign(__assign({}, state), { question: payload });
        default:
            return state;
    }
};
