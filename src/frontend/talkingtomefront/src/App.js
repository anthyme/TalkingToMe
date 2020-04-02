import React, { useState } from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withSearchValue } from "./enhancers/WithSearchValue";
import { UserProvider } from './constants/UserContext'
import SignIn from "./components/Login";
import QuizzCreator from "./quizzCreation/QuizzCreator"
import {Menu} from "./components/Menu";
import logo from './logo.svg';
import './App.css';




function App() {

  const [message, setMessage] = useState(300);

  fetch(`https://talkingtome-api.azurewebsites.net/api/HelloWorldBase`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else if (response.status === 408 || response.status === 400) {
        console.log("Failed getting Channel 1");
      }
    })
    .then(response => { return response.json(); })
    .then(responseData => {
      setMessage(responseData.message);
    })
    .then(() => console.log(message))
    .catch(err => console.log("caught this error: " + err));


  return (
    <UserProvider value=''>
    <Router>
        <div className="container-fluid">
            <Switch>
                <Route exact path="/" render={(props) => (<SignIn />)} />
                <Route exact path="/Menu" render={(props) => (<Menu />)} />
                <Route exact path="/Quizz" render={(props) => (<QuizzCreator />)} />
            </Switch>
        </div>

    </Router>
</UserProvider>
  );
}

export default App;
