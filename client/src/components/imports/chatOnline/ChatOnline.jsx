import React, {useEffect} from "react";
import "../chatOnline/ChatOnline.css";
import {Box, Stack} from "@mui/material";
import {Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
import * as api from "../../../redux/api";
import {useSelector} from "react-redux";
import {getFriendsData} from "../../../redux/features/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function ChatOnline({onlineUsers, currentUser, setCurrentChat}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onlineFriends, setonlineFriends] = useState();
  const {friends} = useSelector((state) => ({...state.auth}));

  useEffect(() => {
    setonlineFriends(
      friends?.filter((f) => onlineUsers?.includes(f.person._id))
    );
    console.log(onlineUsers);
    console.log(onlineFriends);
  });

  // {
  //   onlineFriends?.map((o) => {
  return (
    <Box className="chatOnline">
      <Box className="chatOnlineFriend">
        <Box className="chatOnlineImgContainer">
          {/* <Avatar
            alt={o.person.name}
            src={"http://localhost:3000/" + o.person?.profilePic}
            className="chatOnlineImg"
          />
          <Box className="chatOnlineBadge"></Box>
          <Typography className="chatOnlineName">{o.person.name}</Typography> */}
        </Box>
      </Box>
    </Box>
  );
  //   });
  // }
}

export default ChatOnline;
