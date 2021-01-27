import React from "react";
import Grid from "@material-ui/core/Grid";

import SignUp from "../components/SignUp";

function Register(props) {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <SignUp />
      </Grid>
    </Grid>
  );
}

export default Register;
