import React from "react";
import "../chatOnline/ChatOnline.css";
import {Box, Stack} from "@mui/material";
import {Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

function ChatOnline({onlineUsers, currentUser, setCurrentChat}) {
  return (
    <Box className="chatOnline">
      <Box className="chatOnlineFriend">
        <Box className="chatOnlineImgContainer">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className="chatOnlineImg"
          />
          <Box className="chatOnlineBadge"></Box>
          <Typography className="chatOnlineName">Kiran</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatOnline;
