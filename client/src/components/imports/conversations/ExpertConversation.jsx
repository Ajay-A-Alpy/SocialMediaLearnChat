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
function ExpertConversation({conversation}) {
  const [expert, setExpert] = useState(null);
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
      const getExpert = async function () {
        let response = await api.getChatExpert(friendId);
        setExpert(response.data);
      };
      getExpert();
    } catch (err) {
      console.log(err);
    }
  }, [conversation, user.result_id]);

  return (
    <>
      <List sx={{width: "80%", height: "auto"}}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={expert?.name} secondary="hai" />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}

export default ExpertConversation;
