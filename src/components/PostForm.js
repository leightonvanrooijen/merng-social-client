import React from "react";
import { gql, useMutation } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from "@material-ui/icons/Send";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 3),
  },
  alert: {
    marginTop: theme.spacing(1),
  },
  inputForm: {
    borderRadius: "10px"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function PostForm() {
  const classes = useStyles();
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <FormControl
          onSubmit={onSubmit}
          className={clsx(classes.margin, classes.textField, classes.form)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Create Post
          </InputLabel>
          <OutlinedInput
            className={classes.inputForm}
            multiline
            value={values.body}
            autoComplete="post"
            name="body"
            variant="outlined"
            onChange={onChange}
            error={error ? true : false}
            fullWidth
            id="createPost"
            label="Create Post"
            autoFocus
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="create post"
                  type="submit"
                  onClick={onSubmit}
                  disabled={values.body.trim() === ""}
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
        {error && (
          <Alert
            key={error.graphQLErrors[0].message}
            className={classes.alert}
            severity="error"
          >
            {error.graphQLErrors[0].message}
          </Alert>
        )}
      </div>
    </Container>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
