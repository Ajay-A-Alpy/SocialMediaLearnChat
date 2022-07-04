import { Box } from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";

import ProfileData from "../../../components/imports/ProfileData";
import { useState } from "react";

export default function StudentProfile() {
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>
        <ProfileData data={{ edit, setEdit }}></ProfileData>
      </Stack>
    </Box>
  );
}
