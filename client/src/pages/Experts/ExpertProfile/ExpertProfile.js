import {Box} from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import ExpertProfileData from "../../../components/imports/ExpertProfileData";
import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import ExpertNavbar from "../../../components/imports/ExpertNavbar";

export default function ExpertProfile() {
  return (
    <Box>
      <ExpertNavbar></ExpertNavbar>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <ExpertSidebar></ExpertSidebar>
        <ExpertProfileData></ExpertProfileData>
      </Stack>
    </Box>
  );
}
