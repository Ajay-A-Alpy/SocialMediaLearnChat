import React from "react";
import FollowingsList from "../../../components/imports/FollowingsList";
import {Box} from "@mui/system";
import {Stack, Typography} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Rightbar from "../../../components/imports/Rightbar";
import Navbar from "../../../components/imports/Navbar";

function MyFollowings() {
  return (
    <Box sx={{height: ""}}>
      <Navbar></Navbar>

      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>

        <FollowingsList></FollowingsList>
        {/* <Rightbar></Rightbar> */}
      </Stack>
    </Box>
  );
}

export default MyFollowings;
