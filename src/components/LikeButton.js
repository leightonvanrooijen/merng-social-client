import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  buttonGrey: {
    color: theme.palette.grey[800]
  }
}));


export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Tooltip title="Unlike Post" enterDelay={1200}>
        <Button
          aria-label="like"
          startIcon={<ThumbUpIcon color="primary"/>}
          onClick={likePost}
        >
          {likeCount}
        </Button>
      </Tooltip>
    ) : (
      <Tooltip title="Like Post" enterDelay={1200}>
        <Button
          aria-label="like"
          startIcon={<ThumbUpOutlinedIcon className={classes.buttonGrey}/>}
          onClick={likePost}
        >
          {likeCount}
        </Button>
      </Tooltip>
    )
  ) : (
    <Tooltip title="Login to like post" enterDelay={1200}>
      <Button
        aria-label="like"
        startIcon={<ThumbUpOutlinedIcon className={classes.buttonGrey}/>}
        component={Link}
        to="/login"
      >
        {likeCount}
      </Button>
    </Tooltip>
  );

  return <div>{likeButton}</div>;
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
