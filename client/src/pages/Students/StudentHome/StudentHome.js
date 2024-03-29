import {Box, createTheme} from "@mui/material";
import Feed from "../../../components/imports/Feed";

import Rightbar from "../../../components/imports/Rightbar";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import {useEffect, useState} from "react";
import {ThemeProvider} from "@mui/system";
import {useNavigate} from "react-router-dom";

export default function StudentHome() {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("userToken"));
    if (!profile) {
      navigate("/");
    }
  });

  const darkTheme = createTheme({
    palette: mode,
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"F2FA5A"} color="F2FA5A">
        <Navbar></Navbar>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar></Sidebar>
          <Feed></Feed>
          <Rightbar></Rightbar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
