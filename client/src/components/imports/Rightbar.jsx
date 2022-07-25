import {Box} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddPost from "./AddPost";
import Todo from "../TodoApp/Todo";
function Rightbar() {
  return (
    <Box
      flex={2}
      bgcolor="#a3bded"
      sx={{display: {xs: "none", sm: "none", md: "block"}}}
      p={2}
    >
      <Box sx={{position: "fixed"}}>
        <AddPost></AddPost>
        <Todo></Todo>
      </Box>
    </Box>
  );
}

export default Rightbar;
