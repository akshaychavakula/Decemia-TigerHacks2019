import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import Navbar from "./Navbar";
import Review from "./Review";
import Card from "@material-ui/core/Card";
import Journals from "./Journals";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
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
  //<Review id="ABCD" />
  render() {
    return (
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2}>
            <div style={{ backgroundColor: "#000000", height: "100vh" }}>
              <Sidebar />
            </div>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Paper>
              <Review id="ABCD" />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper></Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Dashboard;
