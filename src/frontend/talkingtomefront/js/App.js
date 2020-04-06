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
var react_router_dom_1 = require("react-router-dom");
var UserContext_1 = require("./constants/UserContext");
var Login_1 = __importDefault(require("./components/Login"));
var QuizzCreator_1 = __importDefault(require("./quizzCreation/QuizzCreator"));
var Menu_1 = __importDefault(require("./components/Menu"));
require("./App.css");
function App() {
    var _a = react_1.useState(300), message = _a[0], setMessage = _a[1];
    fetch("https://talkingtome-api.azurewebsites.net/api/HelloWorldBase", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(function (response) {
        if (response.status === 200) {
            return response;
        }
        else if (response.status === 408 || response.status === 400) {
            console.log('Failed getting Channel 1');
        }
    })
        .then(function (response) {
        return response.json();
    })
        .then(function (responseData) {
        setMessage(responseData.message);
    })
        .then(function () { return console.log(message); })
        .catch(function (err) { return console.log('caught this error: ' + err); });
    return (<UserContext_1.UserProvider value="">
      <react_router_dom_1.BrowserRouter>
        <div className="container-fluid">
          <react_router_dom_1.Switch>
            <react_router_dom_1.Route exact path="/" render={function () { return <Login_1.default />; }}/>
            <react_router_dom_1.Route exact path="/Menu" render={function () { return <Menu_1.default />; }}/>
            <react_router_dom_1.Route exact path="/Quizz" render={function () { return <QuizzCreator_1.default />; }}/>
          </react_router_dom_1.Switch>
        </div>
      </react_router_dom_1.BrowserRouter>
    </UserContext_1.UserProvider>);
}
exports.default = App;
