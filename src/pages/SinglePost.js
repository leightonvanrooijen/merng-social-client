import React from "react";
import { gql, useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"

function SinglePost(props) {
  const postId = props.match.params.postId;
  console.log(postId)

  const { data: { getPost }} = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  let postMarkup;
  if(!getPost){
    postMarkup = <CircularProgress />
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost
    
    postMarkup = (
      <Grid container>
        
      </Grid>
    )
  }
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
