import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
function ExpertSuggestions() {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Box style={{height: "2rem"}}>
            <Paper sx={{borderRadius: "10px", textAlign: "center"}}>
              <Typography>Experts you may know</Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              height: "10rem",
              backgroundColor: "bisque",

              overflowY: "auto",
              marginTop: "2rem",
            }}
          >
            <Box sx={{width: "2rem", backgroundColor: "green", height: "3rem"}}>
              <Card sx={{minWidth: 100}}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="http://localhost:5000/profile.jpg"
                />
              </Card>
            </Box>

            <Box sx={{width: "2rem", backgroundColor: "green", height: "3rem"}}>
              <Card sx={{minWidth: 100}}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="http://localhost:5000/profile.jpg"
                />
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ExpertSuggestions;
