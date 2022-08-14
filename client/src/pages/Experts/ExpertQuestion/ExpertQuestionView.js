import {Box, createTheme} from "@mui/material";
import Feed from "../../../components/imports/Feed";

import Rightbar from "../../../components/imports/Rightbar";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import {useEffect, useState} from "react";
import {ThemeProvider} from "@mui/system";
import {useNavigate} from "react-router-dom";
import QuestionFeed from "../../../components/imports/QuestionFeed";
import ExpertQuestionFeed from "../../../components/imports/ExpertQuestionFeed";
import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import ExpertRightbar from "../../../components/imports/ExpertRightbar";
import ExpertNavbar from "../../../components/imports/ExpertNavbar";

export default function ExpertQuestionView() {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("expertToken"));
    if (!profile) {
      navigate("/");
    }
  });

  const darkTheme = createTheme({
    palette: mode,
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#B0C4DE"} color={"text.primary"}>
        <ExpertNavbar></ExpertNavbar>
        <Stack direction="row" justifyContent="space-between">
          <ExpertSidebar></ExpertSidebar>
          <ExpertQuestionFeed></ExpertQuestionFeed>
          <ExpertRightbar></ExpertRightbar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
