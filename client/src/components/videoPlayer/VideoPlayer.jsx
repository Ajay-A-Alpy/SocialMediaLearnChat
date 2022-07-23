import {Grid, Paper, Typography} from "@mui/material";
import React, {useContext, useEffect} from "react";
import "../videoPlayer/VideoPlayer.css";
import {SocketContext} from "./SocketContext";
import {useRef} from "react";
function VideoPlayer({
  stream,
  myVideo,
  userVideo,
  callAccepted,
  callEnded,
  name,
  call,
}) {
  return (
    <Grid
      container
      gap={2}
      sx={{justifyContent: "center", alignItems: "center"}}
    >
      <Grid item xs={12} sm={5}>
        {stream && (
          <Paper className="VideoPlayer_own">
            <Typography>{name || "Name"}</Typography>
            <video playsInline muted autoPlay src="" ref={myVideo} />
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} sm={5}>
        {callAccepted && !callEnded && (
          <Paper className="VideoPlayer_own">
            <Typography>{"call.name" || "Name"}second video </Typography>
            <video playsInline autoPlay ref={userVideo} />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default VideoPlayer;
