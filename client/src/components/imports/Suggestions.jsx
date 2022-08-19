import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
function Suggestions() {
  return (
    <React.Fragment>
      <AvatarGroup total={6}>
        <Avatar alt="Remy Sharp" src="http://localhost:5000/profile.jpg" />
      </AvatarGroup>
    </React.Fragment>
  );
}

export default Suggestions;
