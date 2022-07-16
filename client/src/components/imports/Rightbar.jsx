import {Box} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddPost from "./AddPost";

function Rightbar() {
  return (
    <Box
      flex={2}
      bgcolor="#F0F8FF"
      sx={{display: {xs: "none", sm: "block"}}}
      p={2}
    >
      <Box sx={{position: "fixed"}}>
        <AddPost></AddPost>
      </Box>
    </Box>
  );
}

export default Rightbar;
