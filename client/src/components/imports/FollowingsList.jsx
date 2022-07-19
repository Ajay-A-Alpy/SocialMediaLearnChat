import React from "react";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {getFollowingsData} from "../../redux/features/authSlice";
import * as api from "../../redux/api";
import {createConversation} from "../../redux/features/chatSlice";

function FollowingsList() {
  const [followingList, setFollowings] = useState([]);
  const navigate = useNavigate();

  const {followings} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state.auth}));
  const handleMessage = (friendId) => {
    let data = {
      first: user.result._id,
      second: friendId,
    };

    const checkChat = async () => {
      try {
        console.log("check chat now");
        let check = await api.getChatStatus(data);
        console.log(check);
        if (check.data.chat) {
          navigate("/messenger");
        } else {
          let conversation = {
            senderId: user.result._id,
            recieverId: friendId,
          };
          console.log("dispatch new conversation");
          dispatch(createConversation({conversation, navigate}));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkChat();
  };

  useEffect(() => {
    let Id = JSON.parse(localStorage.getItem("profile")).result._id;
    dispatch(getFollowingsData({Id, navigate}));
    setFollowings(followings);
    console.log(followingList);
  }, []);

  return (
    <Box flex={6} sx={{backgroundColor: "", minHeight: "90vh"}}>
      {followingList?.map((item, index) => {
        return (
          <List
            sx={{width: "80%", bgcolor: "background.paper", height: "auto"}}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.person.name}
                secondary={item.person.email}
              />
              <Button variant="outlined">view</Button>
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

export default FollowingsList;
