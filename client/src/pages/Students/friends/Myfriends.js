import React from "react";
import FollowersList from "../../../components/imports/FollowersList";
import {Box} from "@mui/system";
import {Stack, Typography} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Rightbar from "../../../components/imports/Rightbar";
import Navbar from "../../../components/imports/Navbar";
import ViewFriends from "../../../components/imports/ViewFriends";

function Myfriends() {
  return (
    <Box>
      <Navbar></Navbar>

      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>

        <ViewFriends></ViewFriends>
        {/* <Rightbar></Rightbar> */}
      </Stack>
    </Box>
  );
}

export default Myfriends;
