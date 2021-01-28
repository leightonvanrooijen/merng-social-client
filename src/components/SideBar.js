import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";

import { AuthContext } from "../contex/auth";

const drawerWidth = 300;

// Defines the section text and routes in the side bar, the logged in ones are defined in body
const topSectionLinks = [{ text: "Home", route: "/" }];
const bottomSectionLinks = [
  { text: "Login", route: "/login" },
  { text: "Sign up", route: "/register" },
];
const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "90vh",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerDiv: {
    height: "98vh",
    display: "flex",
    flexDirection: "column",
  },
  openDrawer: {
    position: "fixed",
    zIndex: 10,
    margin: "15px"
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logoContainer: {
    display: "flex",
    height: "15vh",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  loginList: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: "auto",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ListItem = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    marginBottom: "1px",
    "&$selected, &$selected:hover, &:hover": {
      color: theme.palette.primary.main,
    },
  },
  selected: {},
}))(MuiListItem);

function ResponsiveDrawer(props) {
  const { user, logout } = useContext(AuthContext);
  let drawer;
  const { windowDom } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [selected, setSelected] = useState(path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (text) => {
    setSelected(text);
  };

  !user
    ? (drawer = (
        <div className={classes.drawerDiv}>
          <Divider />
          <div className={classes.logoContainer}>
            <Typography variant="h3">
              Social <FavoriteBorderIcon fontSize="large" />
            </Typography>
          </div>
          <Divider />
          <List className={classes.list}>
            {topSectionLinks.map(({ text, route }, index) => (
              <ListItem
                button
                selected={selected === text.toLowerCase()}
                key={text}
                component={Link}
                to={route}
                onClick={() => handleClick(text.toLowerCase())}
              >
                <Typography variant="h5">
                  <ListItemText disableTypography primary={text} />
                </Typography>
              </ListItem>
            ))}
          </List>
          <List className={classes.loginList}>
            <Divider />
            {bottomSectionLinks.map(({ text, route }, index) => (
              <ListItem
                className={classes.text}
                button
                selected={selected === text.toLowerCase()}
                key={text}
                component={Link}
                to={route}
                onClick={() => handleClick(text.toLowerCase())}
              >
                <Typography variant="h5">
                  <ListItemText disableTypography primary={text} />
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      ))
    : (drawer = (
        <div className={classes.drawerDiv}>
          <Divider />
          <div className={classes.logoContainer}>
            <Typography variant="h3">
              Social <FavoriteBorderIcon fontSize="large" />
            </Typography>
          </div>
          <Divider />
          <List className={classes.list}>
            <ListItem
              button
              selected={selected === "home"}
              key={"username"}
              onClick={() => handleClick("home")}
            >
              <Typography variant="h5">
                <ListItemText disableTypography primary={user.username} />
              </Typography>
            </ListItem>
          </List>
          <Divider />

          <List className={classes.loginList}>
            <Divider />
            <ListItem
              button
              selected={selected === "logout"}
              key={"logout"}
              onClick={logout}
            >
              <Typography variant="h5">
                <ListItemText disableTypography primary={"Logout"} />
              </Typography>
            </ListItem>
          </List>
        </div>
      ));

  const container =
    windowDom !== undefined ? () => windowDom().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.openDrawer}>
        <IconButton
          className={classes.appBar}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClick={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
