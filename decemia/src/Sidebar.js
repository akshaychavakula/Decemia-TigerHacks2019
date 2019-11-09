import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PublishIcon from "@material-ui/icons/Publish";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class SideBar extends React.Component {
  constructor() {
    super();
  }

  goUpload() {
    window.location.href = "/upload";
  }

  render() {
    return (
      <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
        Decemia
        <List component="nav" aria-label="main mailbox folders">
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
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}
export default SideBar;
