import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import Upload from './upload/upload'
import Display from './display/Display'
import Review from './Review'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import * as firebase from 'firebase'



function App() {

  firebase.initializeApp({
    apiKey: "AIzaSyCIagy7pLzLnOvaOtKlVzNsrlPdEiPiTLk",
    authDomain: "decemia-d4470.firebaseapp.com",
    databaseURL: "https://decemia-d4470.firebaseio.com",
    projectId: "decemia-d4470",
    storageBucket: "decemia-d4470.appspot.com",
    messagingSenderId: "437368356761",
    appId: "1:437368356761:web:a4391dc0c8677b4dde9d08"
  });

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Login />
        </Route>
        <Route exact={true} path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact={true} path="/upload">
          <Upload />
        </Route>
        <Route exact={true} path="/paper/:id" component={Review} />
      </Switch>
    </Router>
  );
}

export default App
