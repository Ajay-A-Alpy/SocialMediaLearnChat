import React from "react";
import FollowersList from "../../../components/imports/FollowersList";
import {Box} from "@mui/system";
import {Stack, Typography} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Rightbar from "../../../components/imports/Rightbar";
import Navbar from "../../../components/imports/Navbar";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getFollowersData} from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

function MyFollowers() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    console.log("useeffect called in followers");
    let user = JSON.parse(localStorage.getItem("profile"));
    let Id = user.result._id;
    dispatch(getFollowersData({Id, navigate}));
  }, []);

  return (
    <Box>
      <Navbar></Navbar>
      <Typography
        variant="h5"
        style={{margin: "auto", textAlign: "center", color: "blue"}}
      >
        MY FOLLOWERS
      </Typography>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>

        <FollowersList></FollowersList>
        {/* <Rightbar></Rightbar> */}
      </Stack>
    </Box>
  );
}

export default MyFollowers;
