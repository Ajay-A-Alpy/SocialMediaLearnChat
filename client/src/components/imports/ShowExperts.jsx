import React from "react";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import {Button, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {
  getExpertProfile,
  getStudentProfile,
  setUser,
} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";

import * as api from "../../redux/api";
import {
  createConversation,
  createExpertConversation,
} from "../../redux/features/chatSlice";

function ShowExperts() {
  // const [followersList, setFollowers] = useState([]);

  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allExperts, setExperts] = useState([]);
  useEffect(() => {
    const getAllExperts = async () => {
      try {
        let experts = await api.getAllExperts();

        setExperts(experts.data);
      } catch (err) {
        console.log(err);
      }
    };
    let unsubscribed = false;
    if (!unsubscribed) {
      getAllExperts();
    }
    return () => {
      unsubscribed = true;
    };
  }, []);

  const handleViewProfile = (id) => {
    let userId = id;
    console.log("view reached", id);
    dispatch(getExpertProfile({userId, navigate}));
  };

  const handleMessage = (expertId) => {
    let data = {
      first: user.result._id,
      second: expertId,
    };
    const checkChat = async () => {
      try {
        console.log("check chat now");
        let check = await api.getChatStatus(data);
        console.log(check);
        if (check.data.chat) {
          navigate("/Expertmessenger");
        } else {
          let conversation = {
            senderId: user.result._id,
            recieverId: expertId,
            expert: true,
          };
          console.log("dispatch new conversation");
          dispatch(createExpertConversation({conversation, navigate}));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkChat();
  };

  return (
    <Box flex={6} sx={{backgroundColor: "", minHeight: "90vh"}}>
      <Typography
        variant="h5"
        style={{margin: "auto", textAlign: "center", color: "blue"}}
      >
        Experts
      </Typography>
      {allExperts?.map((item) => {
        return (
          <List
            sx={{width: "80%", bgcolor: "background.paper", height: "auto"}}
            key={item._id}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.email} />
              <Button
                variant="outlined"
                onClick={handleViewProfile.bind(this, item._id)}
              >
                view
              </Button>
              <Button
                variant="outlined"
                onClick={handleMessage.bind(this, item._id)}
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

export default ShowExperts;
