import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import MuiPaper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import DeleteButton from "./DeleteButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "5px",
    padding: "5px 0px 5px 15px",
    backgroundColor: theme.palette.grey[200],
  },
  username: {
    fontWeight: 600,
    fontSize: ".9rem",
    marginRight: "10px",
  },
  deleteButton: {
    alignSelf: "flex-end"
  }
}));

const Paper = withStyles((theme) => ({
  root: {
    borderRadius: "15px",
  },
}))(MuiPaper);

export default function Comment({ comment, user, postId }) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={11}>
          <Typography
            className={classes.username}
            variant="body2"
            component="t"
          >
            {comment.username}
          </Typography>
          <Typography variant="body2" component="t" color="textSecondary">
            {moment(comment.createdAt).fromNow(true)}
          </Typography>
          <Typography className={classes.body} variant="body2" component="p">
            {comment.body}
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.deleteButton} justify="flex-end">
          {user && user.username === comment.username && (
            <DeleteButton postId={postId} commentId={comment.id} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
