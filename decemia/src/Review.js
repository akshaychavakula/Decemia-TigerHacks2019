import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";

import Display from "./display/Display";

const blockstack = require("blockstack");

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentWillMount() {
    blockstack
      .getFile(this.props.id, { decrypt: false })
      .then(fileContents => {
        console.log(fileContents);
        this.setState({ data: fileContents });
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
    return (
      <div className="App">
        <Display data={this.state.data} />
      </div>
    );
  }
}
export default Review;
