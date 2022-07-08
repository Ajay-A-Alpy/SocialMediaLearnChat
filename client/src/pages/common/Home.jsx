import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../common/home.css";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

function Home() {

const navigate=useNavigate()

  return (
    <Grid container className="home">
      <Grid
        item
        xs={12}
        sm={12}
        fontSize={500}
        sx={{
          boxSizing: "border-box",
          borderRadius: "2rem",
          width: "10rem",
          textAlign: "center",
        }}
      >
       
        <Typography variant="h2" color="gray">
        <Fab variant="extended" sx={{fontSize:"3rem" ,width:"auto"}}>
            <SendIcon sx={{ mr: 1 }} />
         Learn Chat
          </Fab>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{display:"flex" ,justifyContent:"center"}} >
        <Box>
          <Fab variant="extended" sx={{fontSize:"2rem"}}  onClick={()=>{navigate('/student/login')}}>
            <NavigationIcon sx={{ mr: 1 }} />
         Students Login
          </Fab>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} sx={{display:"flex" ,justifyContent:"center"}}>
        <Box>
          <Fab variant="extended" sx={{fontSize:"2rem"}} onClick={()=>{navigate('/expert/login')}}>
            <NavigationIcon sx={{ mr: 1 }} />
           Experts Login
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
