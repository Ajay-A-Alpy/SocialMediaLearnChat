import { Box } from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import ExpertProfileData from "../../../components/imports/ExpertProfileData";


export default function ExpertProfile() {


  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>
        <ExpertProfileData></ExpertProfileData>
     
      </Stack>
    </Box>
  );
}
