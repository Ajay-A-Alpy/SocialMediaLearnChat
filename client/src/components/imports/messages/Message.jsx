import {Box, Stack} from "@mui/material";
import React from "react";
import {Typography} from "@mui/material";
import {format} from "timeago.js";
import Avatar from "@mui/material/Avatar";
import "../messages/Message.css";

function Message({message, own}) {
  return (
    <Box className={own ? "message own" : "message"}>
      <Stack direction="column">
        <Box className="message_top">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className="message_img"
          />
          <Typography
            className={own ? "message_text ownText" : "message_text "}
          >
            {message.text}
          </Typography>
        </Box>

        <Box className={own ? "message_bottom own" : "message_bottom"}>
          <Typography>{ format(message.createdAt)}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Message;
