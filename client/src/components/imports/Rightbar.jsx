import {Box, Paper, Typography} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddPost from "./AddPost";
import Todo from "../TodoApp/Todo";
import AddQuestion from "./AddQuestion";
import ExpertSuggestions from "./ExpertSuggestions";
import Suggestions from "./Suggestions";
function Rightbar() {
  return (
    <Box
      flex={2}
      // bgcolor="#F2F2F2"
      bgcolor=""
      sx={{display: {xs: "none", sm: "none", md: "block"}}}
    >
      <Box sx={{height: "1rem"}}></Box>
      <Box
        sx={{
          position: "fixed",
          paddingLeft: "3rem",
          height: "100vh",
          width: "20%",
        }}
      >
        <AddPost></AddPost>
        <div style={{height: "2px"}}></div>
        <AddQuestion></AddQuestion>
        <div style={{height: "1rem"}}></div>
        <Box style={{height: "2rem", borderRadius: "5px"}}>
          <Paper sx={{borderRadius: "10px", textAlign: "center"}}>
            <Typography>Students you may know</Typography>
          </Paper>
        </Box>
        <Box>
          <Suggestions></Suggestions>
        </Box>

        <div style={{height: "1rem"}}></div>
        <ExpertSuggestions></ExpertSuggestions>
      </Box>
    </Box>
  );
}

export default Rightbar;
