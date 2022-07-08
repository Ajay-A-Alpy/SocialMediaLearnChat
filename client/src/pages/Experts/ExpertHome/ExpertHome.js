import { Box, createTheme } from "@mui/material";
import ExpertFeed from "../../../components/imports/ExpertFeed";

import Rightbar from "../../../components/imports/Rightbar";
import ExpertSidebar from '../../../components/imports/ExpertSidebar'
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import { useState } from "react";
import { ThemeProvider } from "@mui/system";

export default function ExpertHome() {

    const [mode,setMode]=useState("dark");

const darkTheme=createTheme({
    palette:mode
})

  return (
    <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"#393f4d" } color={"text.primary"}>
      <Navbar></Navbar>
      <Stack direction="row" spacing={1} justifyContent="space-between">
       <ExpertSidebar></ExpertSidebar>
   <ExpertFeed></ExpertFeed>
       
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
