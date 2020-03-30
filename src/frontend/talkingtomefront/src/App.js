import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';




function App() {

  const [message, setMessage] = useState(300);

  fetch(`https://localhost:44381/api/HelloWorldBase`, {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header>
    </div>
  );
}

export default App;
