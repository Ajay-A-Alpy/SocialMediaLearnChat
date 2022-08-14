import {Box, createTheme} from "@mui/material";

import Stack from "@mui/material/Stack";

import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import ExpertRightbar from "../../../components/imports/ExpertRightbar";
import ExpertNavbar from "../../../components/imports/ExpertNavbar";
import ExpertStudentsList from "../../../components/imports/ExpertStudentsList";
import {getStudentsList} from "../../../redux/features/expertAuthSlice";
export default function ExpertStudents() {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("expertToken"));
    if (!profile) {
      navigate("/");
    }
  });

  useEffect(() => {
    let subscription = false;
    if (!subscription) {
      dispatch(getStudentsList());
    }
    return () => {
      subscription = true;
    };
  }, []);

  const darkTheme = createTheme({
    palette: mode,
  });

  return (
    <Box bgcolor={"#B0C4DE"} color={"text.primary"}>
      <ExpertNavbar></ExpertNavbar>
      <Stack direction="row" justifyContent="space-between">
        <ExpertSidebar></ExpertSidebar>
        <ExpertStudentsList></ExpertStudentsList>
        <ExpertRightbar></ExpertRightbar>
      </Stack>
    </Box>
  );
}
