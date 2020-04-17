import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './constants/UserContext';
import SignIn from './components/Login';
import QuizzCreator from './quizzCreation/QuizzCreator';
import Menu from './menu/Menu';
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

/*
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserProvider } from './constants/UserContext';
import SignIn from './components/Login';
import QuizzCreator from './quizzCreation/QuizzCreator';
import Menu from './menu/Menu';
import TalkInterface from './talk/TalkInterface';
import './App.css';

class Router extends React.Component<RouteComponentProps, any> {
  public render() {
    return (
      <UserProvider value="">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/Menu" component={Menu} />
            <Route exact path="/Quizz" component={QuizzCreator} />
            <Route exact path="/Talk" component={TalkInterface} />
          </Switch>
        </div>
      </UserProvider>
    );
  }
}

export default withRouter(Router);
*/
