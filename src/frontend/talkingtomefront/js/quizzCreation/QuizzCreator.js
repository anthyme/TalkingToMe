"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var QuizzQuestion_1 = __importDefault(require("./QuizzQuestion"));
var lodash_1 = __importDefault(require("lodash"));
function QuizzCreator() {
    var _a = react_1.useState([]), cardIds = _a[0], setCardIds = _a[1];
    var _b = react_1.useState([0]), questionsID = _b[0], setQuestionsId = _b[1];
    var _c = react_1.useState([{}]), questionsJson = _c[0], setQuestionsJson = _c[1];
    var questionIdRdx = react_redux_1.useSelector(function (state) { return state.questionId; });
    var questionRdx = react_redux_1.useSelector(function (state) { return state.question; });
    var currentAnswerRdx = react_redux_1.useSelector(function (state) { return state.currentAnswer; });
    var currentAnswerIdRdx = react_redux_1.useSelector(function (state) { return state.currentAnswerId; });
    var dispatch = react_redux_1.useDispatch();
    var debounceRedux = react_1.useCallback(lodash_1.default.debounce(setNewQuestion, 1000), []);
    function setNewQuestion() {
        var newQuestionJson = questionsJson;
        newQuestionJson[questionIdRdx] = questionRdx;
        setQuestionsJson(newQuestionJson);
    }
    react_1.useEffect(function () {
        if (questionRdx) {
            console.log("questions changed");
            debounceRedux();
            var newQuestionJson = questionsJson;
            newQuestionJson[questionIdRdx] = questionRdx;
            setQuestionsJson(newQuestionJson);
        }
    }, [questionRdx]);
    var AddNewQuestion = function () {
        var newQuestionId = questionsID[questionsID.length - 1] + 1;
        var newTable = __spreadArrays(questionsID, [newQuestionId]);
        setQuestionsId(newTable);
    };
    var ChangeId = function (qId) {
        console.log(qId);
    };
    var ShowJson = function () {
        console.log(questionRdx);
    };
    return (<react_1.default.Fragment>
      <Typography_1.default variant="h6" gutterBottom>
        Quizz Creation
      </Typography_1.default>
      <div>
        {questionsID.map(function (qId) { return (<QuizzQuestion_1.default questionId={qId}/>); })}
      </div>
      <Button_1.default variant="outlined" onClick={AddNewQuestion}>
        Question
      </Button_1.default>
      <Button_1.default variant="outlined" onClick={ShowJson}>
        Show Json
      </Button_1.default>
    </react_1.default.Fragment>);
}
exports.default = QuizzCreator;
