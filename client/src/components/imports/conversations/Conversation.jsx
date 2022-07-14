import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "../conversations/Conversation.css";
import {useState, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import * as api from "../../../redux/api";
function Conversation({conversation}) {
  const [friend, setFriend] = useState(null);
  let friendId;
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  let [a, b] = conversation.members;

  if (a == user.result._id) {
    friendId = b;
  } else {
    friendId = a;
  }

  useEffect(() => {
    const getfriend = async function () {
      let response = await api.getChatFriends(friendId);
      setFriend(response.data);
    };
    getfriend();
  }, [conversation, user.result_id]);

  return (
    <>
      <List sx={{width: "80%", height: "auto"}}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={friend?.user.name} secondary="hai" />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}

export default Conversation;