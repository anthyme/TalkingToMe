import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './constants/UserContext';
import SignIn from './components/Login';
import Menu from './menu/Menu';
import TalkInterface from './talk/TalkInterface';
import './App.css';
import UserAnswerQuizz from './quizzRespond/UserAnswerQuizz';

function App() {
  return (
    <UserProvider value="">
      <Router>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" render={() => <SignIn />} />
            <Route exact path="/Menu" render={() => <Menu />} />
            <Route exact path="/Talk" render={() => <TalkInterface />} />
            <Route exact path="/TalkAnswer" render={() => <UserAnswerQuizz />} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

