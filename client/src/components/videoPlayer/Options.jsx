import React, {Children, useContext, useState, useEffect} from "react";

import {SocketContext} from "./SocketContext";

function Options({children}) {
  useEffect(() => {
    console.log("hello options");
  }, []);

  // const {
  //   call,
  //   callAccepted,
  //   callEnded,
  //   name,
  //   setName,
  //   me,
  //   callUser,
  //   leaveCall,
  // } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      Options
      {children}
    </div>
  );
}

export default Options;
