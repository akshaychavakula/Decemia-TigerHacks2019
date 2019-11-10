import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import "./Login.css"
// import Grid from "@material-ui/core/Grid";
const blockstack = require("blockstack");

class Login extends Component {
  constructor() {
    super();
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    this.userSession = new UserSession({ appConfig });
  }

  signIn(e) {
    e.preventDefault();
    this.userSession.redirectToSignIn();
  }

  // componentWillMount() {
  //   const session = this.userSession;
  // }

  componentDidMount() {
    const session = this.userSession;
    if (session.isUserSignedIn()) {
      window.location.href = "/dashboard";
    }
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    
    if (blockstack.isUserSignedIn()) {
      window.location.href = "/dashboard";
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(userData => {
        window.location.href = "/dashboard";
      });
    }
    if (this.userSession.isUserSignedIn()) {
      window.location.href = "/dashboard";
    }
    return (
      <div>
        <div className="bg-image">
          
        </div>

        <div className="bg-text">   
          <h1>Welcome to Decemia</h1>
          <h2> <button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.signIn.bind(this)}
          >
            Sign in with Blockstack
          </button></h2>
          
        </div>
      </div>
    );
  }
}
export default Login;
