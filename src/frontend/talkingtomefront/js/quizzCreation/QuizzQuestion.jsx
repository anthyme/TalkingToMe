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
var Radio_1 = __importDefault(require("@material-ui/core/Radio"));
var RadioGroup_1 = __importDefault(require("@material-ui/core/RadioGroup"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Answer_1 = __importDefault(require("./Answer"));
var actions = __importStar(require("../store/ActionsTypes"));
var lodash_1 = __importDefault(require("lodash"));
//TODO - Keep changes upon revert, aka : Num of questions & content of each question
function QuizzQuestion(props) {
    var _a = react_1.useState([0, 1]), answersId = _a[0], setAnswersId = _a[1];
    var _b = react_1.useState(''), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(''), questionValue = _c[0], setQuestionValue = _c[1];
    var _d = react_1.default.useState('UCQ'), selectedValue = _d[0], setSelectedValue = _d[1];
    var _e = react_1.useState(true), show = _e[0], setShow = _e[1];
    var _f = react_1.useState(['', '']), answers = _f[0], setAnswers = _f[1];
    var questionIdRdx = react_redux_1.useSelector(function (state) { return state.questionId; });
    var questionRdx = react_redux_1.useSelector(function (state) { return state.question; });
    var currentAnswerRdx = react_redux_1.useSelector(function (state) { return state.currentAnswer; });
    var currentAnswerIdRdx = react_redux_1.useSelector(function (state) { return state.currentAnswerId; });
    var dispatch = react_redux_1.useDispatch();
    var debounceRedux = react_1.useCallback(lodash_1.default.debounce(setRedux, 1000), []);
    var questionJson = {
        question: { questionValue: questionValue },
        type: { selectedValue: selectedValue },
        answers: { answers: answers },
        rightAnswer: { value: value },
    };
    var ShowJson = function () {
        console.log(questionJson);
    };
    function setRedux(newJson) {
        dispatch({ type: actions.UPDATE_QUESTION_VALUE, payload: newJson });
    }
    var deleteQuestion = function (event) {
        //TODO - Change json to empty on quizzcreator
        setShow(false);
    };
    var handleQuestionTypeChange = function (event) {
        setSelectedValue(event.target.value);
    };
    var handleRadioChange = function (event) {
        setValue(event.target.value);
    };
    var handleQuestionChange = function (event) {
        setQuestionValue(event.target.value);
        console.log(value);
    };
    var addNewAnswer = function () {
        var newQuestionId = answersId[answersId.length - 1] + 1;
        var newTable = __spreadArrays(answersId, [newQuestionId]);
        var newAnswersJson = '';
        var newAnswers = __spreadArrays(answers, [newAnswersJson]);
        setAnswersId(newTable);
        setAnswers(newAnswers);
    };
    react_1.useEffect(function () {
        if (props.questionId === questionIdRdx && currentAnswerRdx) {
            console.log('Hello!');
            console.log(questionRdx);
            var newAnswers = answers;
            newAnswers[currentAnswerIdRdx] = currentAnswerRdx;
            var newJson = questionJson;
            setAnswers(newAnswers);
            debounceRedux(newJson);
        }
    }, [currentAnswerRdx, questionValue, value]);
    if (show === true) {
        switch (selectedValue) {
            case 'UCQ':
                return (<react_1.default.Fragment>
            <Paper_1.default variant="outlined">
              <Grid_1.default container spacing={3}>
                <Grid_1.default item xs={12}>
                  <TextField_1.default required id={props.questionId} name={questionValue} label="Question" fullWidth autoComplete="fname" onChange={handleQuestionChange}/>
                  <div>
                    <div>Question Type</div>
                    <Grid_1.default item xs={1}>
                      <RadioGroup_1.default name="gender1" value={selectedValue} onChange={handleQuestionTypeChange}>
                        <FormControlLabel_1.default value="UCQ" control={<Radio_1.default />} label="UCQ"/>
                        <FormControlLabel_1.default value="Text" control={<Radio_1.default />} label="Text"/>
                      </RadioGroup_1.default>
                    </Grid_1.default>
                  </div>
                </Grid_1.default>
                <Grid_1.default item xs={12}>
                  <p>Write all the possible answers and tick the correct one</p>
                  <RadioGroup_1.default aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    <div>
                      {answersId.map(function (qId) { return (<Answer_1.default answerId={qId} questionId={props.questionId}/>); })}
                    </div>
                  </RadioGroup_1.default>
                  <Button_1.default variant="outlined" onClick={addNewAnswer}>
                    Add Answer
                  </Button_1.default>
                  <Button_1.default variant="contained" color="secondary" onClick={deleteQuestion}>
                    Delete Question
                  </Button_1.default>
                </Grid_1.default>
              </Grid_1.default>
              <Button_1.default variant="outlined" onClick={ShowJson}>
                Show Json
              </Button_1.default>
            </Paper_1.default>
          </react_1.default.Fragment>);
            case 'Text':
                return (<react_1.default.Fragment>
            <Paper_1.default variant="outlined">
              <Grid_1.default container spacing={3}>
                <Grid_1.default item xs={12}>
                  <TextField_1.default required id={props.questionId} name={questionValue} label="Question" value="" fullWidth autoComplete="fname" onChange={handleQuestionChange}/>
                  <div>
                    <TextField_1.default value="question Type :"/>
                    <Grid_1.default item xs={1}>
                      <RadioGroup_1.default name="gender1" value={selectedValue} onChange={handleQuestionTypeChange}>
                        <FormControlLabel_1.default value="UCQ" control={<Radio_1.default />} label="UCQ"/>
                        <FormControlLabel_1.default value="Text" control={<Radio_1.default />} label="Text"/>
                      </RadioGroup_1.default>
                    </Grid_1.default>
                  </div>
                  <Button_1.default variant="contained" color="secondary" onClick={deleteQuestion}>
                    Delete Question
                  </Button_1.default>
                </Grid_1.default>
              </Grid_1.default>
            </Paper_1.default>
          </react_1.default.Fragment>);
            default:
                return null;
        }
    }
    else {
        return <></>;
    }
}
exports.default = QuizzQuestion; // = withSearchValue(QuizzQuestion);
