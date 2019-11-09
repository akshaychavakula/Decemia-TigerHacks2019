import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";

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

  render() {
    return (
      <button
        className="btn btn-lg btn-primary btn-block"
        onClick={this.signIn.bind(this)}
      >
        Sign in with Blockstack
      </button>
    );
  }
}
export default Login;
