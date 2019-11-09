import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Dashboard from './Dashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const blockstack = require('blockstack');

function App() {


  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Login />
        </Route>
        <Route exact={true} path="/dashboard">
          <div>Hello</div>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
