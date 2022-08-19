import React from "react";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import {Button, Grid, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {getStudentProfile, setUser} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {getFollowersData} from "../../redux/features/authSlice";
import * as api from "../../redux/api";
import {createConversation} from "../../redux/features/chatSlice";

function FollowersList() {
  // const [followersList, setFollowers] = useState([]);

  const {followers} = useSelector((state) => ({...state.auth}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <Box flex={6} sx={{backgroundColor: "", minHeight: "90vh"}}>
      <Box variant="h5" style={{height: "2rem"}}></Box>
      {followers?.map((item) => {
        return (
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <List
                sx={{
                  width: "80%",
                  bgcolor: "background.paper",
                  height: "auto",
                  borderRadius: "1rem",
                  marginTop: "1rem",
                }}
                key={item.person._id}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        item?.person?.profilePic
                          ? "http://localhost:5000/" + item?.person?.profilePic
                          : "http://localhost:5000/profile.jpg"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{fontSize: {xs: "10px", sm: "15px", md: "20px"}}}
                      >
                        {item.person.name}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{display: {xs: "none", sm: "block"}}}>
                        {item.person.email}
                      </Typography>
                    }
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
            </Grid>{" "}
          </Grid>
        );
      })}
    </Box>
  );
}

export default FollowersList;
