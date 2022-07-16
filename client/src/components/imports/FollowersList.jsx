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
import {getStudentProfile, setUser} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {getFollowersData} from "../../redux/features/authSlice";

function FollowersList() {
  // const [followersList, setFollowers] = useState([]);

  const {followers} = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewProfile = (id) => {
    let userId = id;
    console.log("view reached", id);
    dispatch(getStudentProfile({userId, navigate}));
  };

  return (
    <Box flex={6} sx={{backgroundColor: "", minHeight: "90vh"}}>
      {followers.map((item) => {
        return (
          <List
            sx={{width: "80%", bgcolor: "background.paper", height: "auto"}}
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
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        );
      })}
    </Box>
  );
}

export default FollowersList;
