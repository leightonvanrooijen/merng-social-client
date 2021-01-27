import React, { useState, useRef } from "react";
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from "@material-ui/icons/Send";

import { SUBMIT_COMMENT_MUTATION } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  form: {
    width: "100%",
    marginBottom: "10px"
  },
  inputForm: {
    borderRadius: "10px"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

}));

export default function CustomizedInputBase({ postId }) {
  const classes = useStyles();
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField, classes.form)}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">
        Create Comment
      </InputLabel>
      <OutlinedInput
        className={classes.inputForm}
        id="outlined-adornment-password"
        type="text"
        multiline
        onChange={(event) => setComment(event.target.value)}
        value={comment}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="create comment"
              onClick={submitComment}
              disabled={comment.trim() === ""}
              edge="end"
              label="Submit"
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={125}
      />
    </FormControl>
  );
}
