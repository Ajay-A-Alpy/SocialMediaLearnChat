import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect} from "react";
import "../common/home.css";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import SendIcon from "@mui/icons-material/Send";
import {useNavigate} from "react-router-dom";
import {setExpertLogout} from "../../redux/features/expertAuthSlice";

import {useDispatch} from "react-redux";
import decode from "jwt-decode";
import {setLogout} from "../../redux/features/authSlice";

function Home() {
  const student = JSON.parse(localStorage.getItem("userToken"));
  const expert = JSON.parse(localStorage.getItem("expertToken"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (student) {
    let decodeToken = decode(student);
    if (decodeToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
      navigate("/");
    }
  }
  if (expert) {
    let decodeExpert = decode(expert);
    if (decodeExpert.exp * 1000 < new Date().getTime()) {
      dispatch(setExpertLogout());
      navigate("/");
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      navigate("/student");
    }
  });

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
          <Fab
            variant="extended"
            sx={{fontSize: "2rem", width: "auto"}}
            className="title"
          >
            <SendIcon sx={{mr: 1}} />
            Learn Chat
          </Fab>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{display: "flex", justifyContent: "center"}}
      >
        <Box>
          <Fab
            variant="extended"
            sx={{fontSize: "2rem"}}
            onClick={() => {
              navigate("/student/login");
            }}
            className="button"
          >
            <NavigationIcon sx={({mr: 1}, {fontSize: {xs: "0.8px"}})} />
            Student Login
          </Fab>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{display: "flex", justifyContent: "center"}}
      >
        <Box>
          <Fab
            variant="extended"
            sx={{fontSize: "2rem"}}
            onClick={() => {
              navigate("/expert/login");
            }}
            className="button"
          >
            <NavigationIcon sx={({mr: 1}, {fontSize: {xs: "1px"}})} />
            Expert Login
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
