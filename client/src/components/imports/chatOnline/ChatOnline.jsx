import React, {useEffect} from "react";
import "../chatOnline/ChatOnline.css";
import {Box, Stack} from "@mui/material";
import {Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
import * as api from "../../../redux/api";
import {unstable_renderSubtreeIntoContainer} from "react-dom";

function ChatOnline({onlineUsers, currentUser, setCurrentChat}) {
  const [onlineFriends, setonlineFriends] = useState();
  const [Friends, setFriends] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("profile"));
    let Id = currentUser.result._id;
    const getmyfriends = async () => {
      let resp = await api.getFriends(Id);
      setFriends(resp.data);
    };
    getmyfriends();
  }, [currentUser]);

  useEffect(() => {
    if (onlineUsers?.length > 0 && Friends.length > 0) {
      let result = Friends.filter((f) => {
        return onlineUsers.includes(f.person._id);
      });

      if (result.length > 0) {
        setonlineFriends(result);
      }
    }
  }, [Friends, onlineUsers]);

  return (
    <>
      {onlineFriends?.map((o) => {
        return (
          <Box className="chatOnline">
            <Box className="chatOnlineFriend">
              <Box className="chatOnlineImgContainer">
                <Avatar
                  alt={o.person.name}
                  src={"http://localhost:3000/" + o.person?.profilePic}
                  className="chatOnlineImg"
                />
                <Box className="chatOnlineBadge"></Box>
                <Typography className="chatOnlineName">
                  {o.person.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default ChatOnline;
