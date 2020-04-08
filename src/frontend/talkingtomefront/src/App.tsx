import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './constants/UserContext';
import SignIn from './components/Login';
import QuizzCreator from './quizzCreation/QuizzCreator';
import Menu from './components/Menu';
import TalkInterface from './talk/TalkInterface';
import './App.css';

function App() {
  return (
    <UserProvider value="">
      <Router>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" render={() => <SignIn />} />
            <Route exact path="/Menu" render={() => <Menu />} />
            <Route exact path="/Quizz" render={() => <QuizzCreator />} />
            <Route exact path="/Talk" render={() => <TalkInterface />} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
