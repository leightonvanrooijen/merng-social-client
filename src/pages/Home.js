import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../contex/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid className={classes.header} container spacing={3} justify="center">
      <Grid item xs={12} md={10} lg={8}>
        <Typography align="center" variant="h3">
          Feed
        </Typography>
      </Grid>
      {user && (
        <Grid item xs={12} md={10} lg={8}>
          <PostForm />
        </Grid>
      )}
      {loading ? (
        <Grid item xs={12} md={10} lg={8}>
          <Typography variant="h6">Loading Posts..</Typography>
        </Grid>
      ) : (
        posts &&
        posts.map((post) => (
          <Fade in={post ? true : false} timeout={1500}>
            <Grid item xs={12} md={10} lg={8} key={post.id}>
              <PostCard post={post} />
            </Grid>
          </Fade>
        ))
      )}
    </Grid>
  );
}
