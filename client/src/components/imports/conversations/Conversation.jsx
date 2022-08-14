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
    try {
      const getfriend = async function () {
        if (conversation.members.length == 2) {
          let response = await api.getChatFriends(friendId);
          setFriend(response.data);
        }
      };
      getfriend();
    } catch (err) {
      console.log(err);
    }
  }, [conversation, user.result_id]);

  return (
    <>
      <List sx={{width: "90%", height: "auto"}}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {conversation.groupName ? (
              <Avatar>G</Avatar>
            ) : (
              <Avatar>{friend?.user?.name.slice(0, 2)}</Avatar>
            )}
          </ListItemAvatar>
          {conversation.groupName ? (
            <ListItemText
              primary={conversation.groupName}
              secondary={conversation?.members.length + " members"}
            />
          ) : (
            <ListItemText primary={friend?.user?.name} secondary="hai" />
          )}
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}

export default Conversation;
