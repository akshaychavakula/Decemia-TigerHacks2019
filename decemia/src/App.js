import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const blockstack = require('blockstack');

function App() {

  if (blockstack.isUserSignedIn()) {
    //Go to active user page.
  }
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
