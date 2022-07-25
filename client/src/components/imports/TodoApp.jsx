import {Box, Grid, Typography} from "@mui/material";
import React from "react";

function TodoApp() {
  return (
    <Grid container>
      <Grid item>
        <Box className="todoApp">
          <Typography>My Notes</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TodoApp;
