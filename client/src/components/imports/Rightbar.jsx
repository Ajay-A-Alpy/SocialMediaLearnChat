import {Box} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddPost from "./AddPost";
import Todo from "../TodoApp/Todo";
import AddQuestion from "./AddQuestion";
function Rightbar() {
  return (
    <Box
      flex={2}
      bgcolor="#F2F2F2"
      sx={{display: {xs: "none", sm: "none", md: "block"}}}
      p={2}
    >
      <Box sx={{height: "1rem"}}></Box>
      <Box
        sx={{
          position: "fixed",
          paddingLeft: "2rem",
          borderLeft: "1px solid #d3cedb",
          height: "100vh",
        }}
      >
        <AddPost></AddPost>
        <AddQuestion></AddQuestion>
        <Todo></Todo>
      </Box>
    </Box>
  );
}

export default Rightbar;
