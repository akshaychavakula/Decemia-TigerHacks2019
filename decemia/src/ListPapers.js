import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Link from "@material-ui/core/Link";

const blockstack = require("blockstack");

class ListPapers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };

    this.goToPaper = this.goToPaper.bind(this);
  }

  componentWillMount() {
    let files = [];
    blockstack
      .listFiles(file => {
        files.push(file);
        return true;
      })
      .then(() => {
        this.setState({ files: files });
        console.log(files);
      });
  }

  goToPaper(id) {
    window.location.href = "/paper/" + id;
  }

  componentDidMount() {
    console.log(this.props);
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return (
      <div>
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.files.map(file => (
            <ListItem button onClick={() => this.goToPaper(file)}>
              <ListItemText primary={file} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
export default ListPapers;
