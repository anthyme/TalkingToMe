"use strict";
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
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var actions = __importStar(require("../store/ActionsTypes"));
//import {withSearchValue} from "../enhancers/WithSearchValue";
function Answer(props) {
    var _a = react_1.useState(''), value = _a[0], setValue = _a[1];
    var _b = react_1.useState(true), show = _b[0], setShow = _b[1];
    var currentAnswerRdx = react_redux_1.useSelector(function (state) { return state.currentAnswer; });
    var currentAnswerIdRdx = react_redux_1.useSelector(function (state) { return state.currentAnswerId; });
    var questionIdRdx = react_redux_1.useSelector(function (state) { return state.questionId; });
    var dispatch = react_redux_1.useDispatch();
    var deleteAnswer = function (event) {
        dispatch({
            type: actions.UPDATE_CURRENTANSWERID_VALUE,
            payload: props.answerId,
        });
        dispatch({
            type: actions.UPDATE_QUESTIONID_VALUE,
            payload: props.questionId,
        });
        dispatch({ type: actions.UPDATE_CURRENTANSWER_VALUE, payload: 'empty' });
        setShow(false);
    };
    var onInputChange = function (event) {
        setValue(event.target.value);
        dispatch({
            type: actions.UPDATE_CURRENTANSWERID_VALUE,
            payload: props.answerId,
        });
        dispatch({
            type: actions.UPDATE_QUESTIONID_VALUE,
            payload: props.questionId,
        });
        dispatch({
            type: actions.UPDATE_CURRENTANSWER_VALUE,
            payload: event.target.value,
        });
    };
    switch (show) {
        case true:
            return (<react_1.default.Fragment>
          <Grid_1.default item spacing="0">
            <FormControlLabel_1.default value={value} control={<Radio_1.default />}/>
            <TextField_1.default placeholder={'Answer' + props.answerId} inputProps={{ 'aria-label': 'description' }} onChange={function (event) {
                onInputChange(event);
            }}/>
            <Delete_1.default onClick={deleteAnswer} style={{ cursor: 'pointer' }}/>
          </Grid_1.default>
        </react_1.default.Fragment>);
        case false:
            return <></>;
    }
}
exports.default = Answer;
