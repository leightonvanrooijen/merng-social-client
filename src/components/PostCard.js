import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import { Divider, Tooltip } from "@material-ui/core";
import { AuthContext } from "../contex/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Comment from "./Comment";
import InsertComment from "./InsertComment";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  deleteIcon: {
    marginLeft: "auto",
  },

  buttonGrey: {
    color: theme.palette.grey[800],
  },
}));

export default function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { user } = useContext(AuthContext);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={moment(createdAt).fromNow(true)}
      />
      <CardContent>
        <Typography variant="body2" color="text" component="p">
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Tooltip title="View Comments" enterDelay={1200}>
          <Button
            className={clsx(classes.expand, classes.buttonGrey, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="write/view commments"
            startIcon={<CommentIcon />}
          >
            {commentCount}
          </Button>
        </Tooltip>
        {user && user.username === username && <DeleteButton postId={id} />}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <InsertComment postId={id} />
          {comments.map((comment) => (
            <Comment comment={comment} user={user} postId={id} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
