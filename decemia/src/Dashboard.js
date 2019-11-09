import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";

class Dashboard extends Component {
  constructor() {
    super();
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    this.userSession = new UserSession({ appConfig });
  }

  signOut(e) {
    e.preventDefault();
    this.userSession.signUserOut("/");
  }

  componentWillMount() {}

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return <div className="App"></div>;
  }
}
export default Dashboard;
