import React from "react";
import {Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
function ErrorPage() {
  return (
    <Grid>
      <Grid item xs={12} sm={12}>
        <img
          src={"http://localhost:5000/404.webp"}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <a href="/">
          <Typography sx={{marginX: "auto"}}>Go to home</Typography>
        </a>
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
