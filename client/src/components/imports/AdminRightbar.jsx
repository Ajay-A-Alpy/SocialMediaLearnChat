import {Box} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddPost from "./AddPost";

function AdminRightbar() {
  return (
    <Box
      flex={1}
      bgcolor="#F0F8FF"
      sx={{display: {xs: "none", sm: "block"}}}
      p={2}
    >
      <Box sx={{position: "fixed"}}></Box>
    </Box>
  );
}

export default AdminRightbar;
