import {Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";

import {Box} from "@mui/system";

import {useState, useEffect, useRef} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";
import {CopyToClipboard} from "react-copy-to-clipboard";
const socket = io("http://localhost:8900");

export default function VideoChat() {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState();
  const [callRecieving, setCallRecieving] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    try {
      const getStream = async () => {
        let currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        myVideo.current = {};
        myVideo.current.srcObject = currentStream;
      };
      getStream();
    } catch (err) {
      console.log(err);
    }

    socket.on("me", (id) => {
      console.log("video socket connecting");
      setMe(id);
    });
    socket.on("callUser", ({from, name: callerName, signal}) => {
      console.log("video socket calling ");
      setCall({isRecievedCall: true, from, name: callerName, signal});
    });
  }, []);

  const callUser = (id) => {
    console.log("call initiated");
    setCallRecieving(true);
    const peer = new Peer({initiator: true, trickle: false, stream});
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: me,
        name,
        userToCall: id,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal = signal;
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    console.log("video socket answer calling ");
    setCallAccepted(true);
    const peer = new Peer({initiator: false, trickle: false, stream});
    peer.on("signal", (data) => {
      socket.emit("answerCall", {signal: data, to: call.from});
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    console.log("call ended");
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={10}
        sx={{margin: "auto", height: "90vh", backgroundColor: "beige"}}
      >
        <Stack direction="column">
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              backgroundColor: "",
              borderRadius: "30px",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                display: "block",
                width: "200px",
                backgroundColor: "yellow",
                padding: "auto",
                height: "3rem",
                lineHeight: "50px",
              }}
              gutterBottom
            >
              VIDEO CHAT
            </Typography>
          </Box>
        </Stack>

        <Grid
          container
          gap={2}
          sx={{justifyContent: "center", alignItems: "center"}}
        >
          <Grid item xs={12} sm={5}>
            <Typography>{name}</Typography>
            {stream && (
              <Paper className="VideoPlayer_own">
                <video
                  playsInline
                  muted
                  autoPlay
                  src=""
                  ref={myVideo}
                  style={{width: "25rem", height: "20rem"}}
                />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            {callAccepted && !callEnded && (
              <Paper className="VideoPlayer_own">
                <Typography>{"call.name" || "Name"}</Typography>
                <video
                  playsInline
                  autoPlay
                  ref={userVideo}
                  style={{width: "25rem", height: "20rem"}}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <TextField
            placeholder="Your Name"
            variant="standard"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            sx={{padding: "", width: "10%"}}
          />
          <Box>
            <CopyToClipboard text={me}>
              <Button variant="contained">Copy ID</Button>
            </CopyToClipboard>
          </Box>
          <Box>
            <TextField
              placeholder="ID to Call"
              variant="standard"
              value={call}
              onChange={(e) => {
                setCall(e.target.value);
              }}
              sx={{padding: "", width: "10%"}}
            />
          </Box>
        </Grid>
        <Box className="bottom">
          {callAccepted && !callEnded ? (
            <Button variant="contained" color="secondary" onClick={leaveCall}>
              End Call
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (call !== "") {
                  callUser(call);
                }
              }}
            >
              Call
            </Button>
          )}
        </Box>
        <Box className="bottom">
          {callRecieving && !callAccepted ? (
            <Paper className="">
              <Typography>{name + ".... is calling"}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={answerCall}
              >
                answer
              </Button>
            </Paper>
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
