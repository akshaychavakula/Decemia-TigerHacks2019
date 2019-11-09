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

  componentWillMount() {
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn().then(userData => {
        if (!userData.username) {
          throw new Error("This app requires a username.");
        }
        window.location = `/kingdom/${userData.username}`;
      });
    }
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Login to Decemia.</p>
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.signIn.bind(this)}
          >
            Sign in with Blockstack
          </button>
        </header>
      </div>
    );
  }
}
export default Login;
