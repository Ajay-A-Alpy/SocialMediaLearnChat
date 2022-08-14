import {Box, createTheme} from "@mui/material";
import ExpertFeed from "../../../components/imports/ExpertFeed";

import Rightbar from "../../../components/imports/Rightbar";
import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import {useState} from "react";
import {ThemeProvider} from "@mui/system";
import ExpertNavbar from "../../../components/imports/ExpertNavbar";
import ExpertRightbar from "../../../components/imports/ExpertRightbar";

export default function ExpertHome() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: mode,
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#faf8f9"} color={"text.primary"}>
        <ExpertNavbar></ExpertNavbar>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <ExpertSidebar></ExpertSidebar>
          <ExpertFeed></ExpertFeed>
          <ExpertRightbar></ExpertRightbar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
