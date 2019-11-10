import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PublishIcon from "@material-ui/icons/Publish";
// import DraftsIcon from "@material-ui/icons/Drafts";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
// import MUIcon from "./muhealth.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
const blockstack = require("blockstack");

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   }
// }));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  goUpload() {
    window.location.href = "/upload";
  }

  goDashboard() {
    window.location.href = "/dashboard";
  }

  componentWillMount() {
    this.setState({ user: blockstack.loadUserData() });
  }

  logout() {
    blockstack.signUserOut("/");
  }

  render() {
    return (
      <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ padding: "10px" }}
        >
          <h2 style={{ paddingLeft: "46px" }}>Decemia</h2>
          <ListItem button>
            <ListItemIcon>
              <PublishIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Publish"
              onClick={this.goUpload.bind(this)}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Papers"
              onClick={this.goDashboard.bind(this)}
            />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="" src="https://logo.clearbit.com/muhealth.org" />
            </ListItemAvatar>
            <ListItemText primary={this.state.user.profile.name} />
            <ExitToAppIcon onClick={this.logout.bind(this)} color="primary" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}
export default SideBar;
