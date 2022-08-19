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
import {Button, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {
  getFollowingsData,
  getStudentProfile,
} from "../../redux/features/authSlice";
import * as api from "../../redux/api";
import {createConversation} from "../../redux/features/chatSlice";

function FollowingsList() {
  const [followingList, setFollowings] = useState([]);
  const navigate = useNavigate();

  const {followings} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state.auth}));

  const handleViewProfile = (id) => {
    let userId = id;

    dispatch(getStudentProfile({userId, navigate}));
  };

  const handleMessage = (friendId) => {
    let data = {
      first: user.result._id,
      second: friendId,
    };

    const checkChat = async () => {
      try {
        let check = await api.getChatStatus(data);

        if (check.data.chat) {
          navigate("/messenger");
        } else {
          let conversation = [user.result._id, friendId];

          dispatch(createConversation({conversation, navigate}));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkChat();
  };

  useEffect(() => {
    dispatch(getFollowingsData({navigate}));
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

export default FollowingsList;
