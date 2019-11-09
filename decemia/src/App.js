import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import Upload from './upload/upload'
import Review from './Review'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
        <Route exact={true} path="/upload">
          <Upload />
        </Route>
        <Route exact={true} path="/review">
          <Review id="ABCD" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App
