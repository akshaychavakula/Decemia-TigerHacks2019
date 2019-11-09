import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Journals() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper height="800px"></Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
