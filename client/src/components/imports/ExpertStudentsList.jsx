import React from "react";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import {Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {getStudentProfile} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";

import * as api from "../../redux/api";
import {createExpertConversation} from "../../redux/features/chatSlice";

function ExpertStudentsList() {
  const {students} = useSelector((state) => ({...state.expertAuth}));
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = expert;

  const handleViewProfile = (id) => {
    let userId = id;

    dispatch(getStudentProfile({userId, navigate}));
  };

  const handleMessage = (studentId) => {
    let data = {
      first: user.result._id,
      second: studentId,
    };
    const checkChat = async () => {
      try {
        let check = await api.getChatStatus(data);

        if (check.data.chat) {
          navigate("/Expertmessenger");
        } else {
          let conversation = {
            senderId: user.result._id,
            recieverId: studentId,
            expert: true,
          };

          dispatch(createExpertConversation({conversation, navigate}));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkChat();
  };

  return (
    <Box flex={4} sx={{backgroundColor: "", minHeight: "90vh"}}>
      {students?.map((item) => {
        return (
          <List
            sx={{
              width: "80%",
              bgcolor: "background.paper",
              height: "auto",
              margin: "2rem",
            }}
            key={item._id}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.person.name}
                secondary={item.person.email}
              />
              <Button
                variant="outlined"
                onClick={handleViewProfile.bind(this, item.person._id)}
              >
                view
              </Button>
              <Button
                variant="outlined"
                onClick={handleMessage.bind(this, item.person._id)}
              >
                Message
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        );
      })}
    </Box>
  );
}

export default ExpertStudentsList;
