import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Routes from "./routes/Routes";
import SideBar from "./components/SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <SideBar />
          <Grid
            className={classes.content}
            container
            spacing={3}

            alignItems="center"
            justify="center"
          >
            <Grid item xs={10}>
              <Routes />
            </Grid>
          </Grid>
      </div>
    </>
  );
}

export default App;
