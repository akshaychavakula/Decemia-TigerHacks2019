import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
const blockstack = require("blockstack");

class Review extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    blockstack
      .getFile(this.props.id, { decrypt: false })
      .then(fileContents => {
        console.log(fileContents);
      })
      .catch(e => {
        console.log("e");
        console.log(e);
        alert(e.message);
      });
  }

  componentDidMount() {
    console.log(this.props);
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return <div className="App"></div>;
  }
}
export default Review;
