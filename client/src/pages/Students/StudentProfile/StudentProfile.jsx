import {Box} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";

import ProfileData from "../../../components/imports/ProfileData";

export default function StudentProfile() {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar></Sidebar>
        <ProfileData></ProfileData>
      </Stack>
    </Box>
  );
}
