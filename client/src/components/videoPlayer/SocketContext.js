import React from "react";
import {useState, useEffect, createContext, useRef} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";
const SocketContext = createContext();
const socket = io("http://localhost:8900");

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
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

        // myVideo.current.srcObject = currentStream;
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
  const callUser = (id) => {
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

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        me,
        // callUser,
        // leaveCall,
        // answerCall,
      }}
    ></SocketContext.Provider>
  );
};

export {SocketContext, ContextProvider};
