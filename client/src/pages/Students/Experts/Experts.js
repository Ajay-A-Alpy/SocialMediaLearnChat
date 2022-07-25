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
import {useNavigate} from "react-router-dom";
import ShowExperts from "../../../components/imports/ShowExperts";

function Experts() {
  return (
    <Box>
      <Navbar></Navbar>

      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>

        <ShowExperts></ShowExperts>
      </Stack>
    </Box>
  );
}

export default Experts;
