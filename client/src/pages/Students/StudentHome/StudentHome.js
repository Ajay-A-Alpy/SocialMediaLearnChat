import { Box, createTheme } from "@mui/material";
import Feed from "../../../components/imports/Feed";

import Rightbar from "../../../components/imports/Rightbar";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import { useState } from "react";
import { ThemeProvider } from "@mui/system";

export default function StudentHome() {

    const [mode,setMode]=useState("dark");

const darkTheme=createTheme({
    palette:mode
})

  return (
    <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"#393f4d" } color={"text.primary"}>
      <Navbar></Navbar>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar></Sidebar>
        <Feed></Feed>
        <Rightbar></Rightbar>
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
