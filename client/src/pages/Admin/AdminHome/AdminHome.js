import {Box, createTheme} from "@mui/material";
import ExpertFeed from "../../../components/imports/ExpertFeed";

import Rightbar from "../../../components/imports/Rightbar";
import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import {useEffect, useState} from "react";
import {ThemeProvider} from "@mui/system";
import AdminNavbar from "../../../components/imports/AdminNavbar";
import {useNavigate} from "react-router-dom";
import AdminSidebar from "../../../components/imports/AdminSidebar";
import AdminDashboard from "../../../components/imports/AdminDashboard";
import AdminRightbar from "../../../components/imports/AdminRightbar";

export default function AdminHome() {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("adminProfile");
    if (!token) {
      navigate("/admin/login");
    }
  });

  const darkTheme = createTheme({
    palette: mode,
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#91A6FF"} color={"text.primary"}>
        <AdminNavbar></AdminNavbar>
        <Stack direction="row" justifyContent="space-between">
          <AdminSidebar></AdminSidebar>
          <AdminDashboard></AdminDashboard>
          <AdminRightbar></AdminRightbar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
