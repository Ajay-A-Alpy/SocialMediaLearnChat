import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import * as api from "../../redux/api";

function GetAvatar({userId}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      let data = {id: userId};
      let resp = await api.getOneUser(data);
      setUser(resp.data);
    };
    let unsubscribed = false;
    if (!unsubscribed) {
      getData();
    }
    return () => {
      unsubscribed = true;
    };
  }, []);
  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src={
          user?.result?.profilePic
            ? "http://localhost:5000/" + user?.result?.profilePic
            : "http://localhost:5000/profile.jpg"
        }
      />
    </>
  );
}

export default GetAvatar;
