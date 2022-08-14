import React from "react";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {
  getFriendsData,
  getStudentProfile,
} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import * as api from "../../redux/api";
import {createConversation} from "../../redux/features/chatSlice";

function ViewFriends() {
  const [friendsList, setFriendsList] = useState([]);

  const {friends} = useSelector((state) => ({...state.auth}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFriendsData(navigate));
    setFriendsList(friends);
    console.log(friendsList);
  }, []);

  const handleViewProfile = (id) => {
    let userId = id;
    console.log("view reached", id);
    dispatch(getStudentProfile({userId, navigate}));
  };

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
          let conversation = [user.result._id, friendId];

          console.log("dispatch new conversation");
          dispatch(createConversation({conversation, navigate}));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkChat();
  };

  return (
    <Box flex={6} sx={{backgroundColor: "", minHeight: "90vh"}}>
      {friendsList?.length == 0 ? (
        <Typography
          variant="h5"
          sx={{
            display: "block",
            textAlign: "center",
            color: "gray",
            width: "80%",
          }}
        >
          You have no friends yet
        </Typography>
      ) : (
        friendsList?.map((item, index) => {
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
        })
      )}
    </Box>
  );
}

export default ViewFriends;
