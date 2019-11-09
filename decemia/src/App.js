import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
const blockstack = require('blockstack');

function App() {

  if (blockstack.isUserSignedIn()) {
    //Go to active user page.
  }
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
}

export default App;
