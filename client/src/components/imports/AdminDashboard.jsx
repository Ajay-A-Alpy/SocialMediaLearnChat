import React, {useState} from "react";
import {Box} from "@mui/system";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {Grid, Paper, Stack, Typography} from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as api from "../../redux/api";

function AdminDashboard() {
  const [allArticles, setArticles] = useState([]);
  const [allStudents, setStudents] = useState([]);
  const [allExperts, setExperts] = useState([]);

  useEffect(() => {
    const getAllCounts = async () => {
      try {
        console.log("get counts reached");
        let articles = await api.getAllArticles();
        let students = await api.getAllStudents();
        let experts = await api.getAllExperts();
        setArticles(articles.data);
        setExperts(experts.data);
        setStudents(students.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCounts();
  }, []);

  return (
    <Box flex={6} sx={{backgroundColor: "#91A6FF", height: "85vh"}}>
      <Typography
        fontSize="2rem"
        sx={{
          height: "3rem",
          dispay: "block",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        Dashborad
      </Typography>
      <Grid container gap={2} sx={{justifyContent: "center"}}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{height: "20rem", textAlign: "center"}}>
            <SupervisedUserCircleIcon
              sx={{height: "15rem", width: "15rem", color: "#2e8ee6"}}
            ></SupervisedUserCircleIcon>
            <Stack direction="column" sx={{textAlign: "center"}}>
              <Typography variant="h5">
                {allStudents ? "Total Students : " + allStudents.length : " "}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{height: "20rem", textAlign: "center"}}>
            <SupervisorAccountIcon
              sx={{height: "15rem", width: "15rem", color: "#e2c21f"}}
            ></SupervisorAccountIcon>
            <Stack direction="column" sx={{textAlign: "center"}}>
              <Typography variant="h5">
                Total Experts: {allExperts?.length}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{height: "20rem", textAlign: "center"}}>
            <LibraryBooksIcon
              sx={{height: "15rem", width: "15rem", color: "#e15ae3"}}
            ></LibraryBooksIcon>
            <Stack direction="column" sx={{textAlign: "center"}}>
              <Typography variant="h5">
                Total Articles : {allArticles?.length}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
