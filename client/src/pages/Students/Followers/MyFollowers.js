import React from "react";
import FollowersList from "../../../components/imports/FollowersList";
import {Box} from "@mui/system";
import {Stack, Typography} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Rightbar from "../../../components/imports/Rightbar";
import Navbar from "../../../components/imports/Navbar";

function MyFollowers() {
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
