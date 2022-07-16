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

function FollowingsList() {
  const [followingList, setFollowings] = useState([]);
  const navigate = useNavigate();

  const {followings} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();

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
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        );
      })}
    </Box>
  );
}

export default FollowingsList;
