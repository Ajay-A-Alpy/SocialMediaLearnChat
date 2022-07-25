import {Box} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import {Link, useNavigate} from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FeedIcon from "@mui/icons-material/Feed";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import NightlightIcon from "@mui/icons-material/Nightlight";
import {
  getFollowersData,
  getFollowingsData,
  getFriendsData,
} from "../../redux/features/authSlice";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function Sidebar() {
  const {user} = useSelector((state) => ({...state.auth}));

  useEffect(() => {
    dispatch(getFriendsData(navigate));
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let handleShowFollowers = () => {
    let Id = user.result._id;
    dispatch(getFollowersData({Id, navigate}));
  };

  let handleShowFollowings = () => {
    let Id = user.result._id;
    dispatch(getFollowingsData({Id, navigate}));
  };
  let handleShowFriends = () => {
    navigate("/student/friends");
  };

  let handleShowExperts = () => {
    navigate("/student/experts");
  };

  return (
    <Box
      flex={1}
      bgcolor="#F0F8FF"
      p={2}
      sx={{display: {xs: "none", sm: "none", md: "block"}}}
    >
      <Box sx={{position: "fixed"}}>
        <List>
          {user ? (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  sx={{fontSize: "2rem", display: {md: "none", lg: "block"}}}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            ""
          )}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText
                primary="Home"
                onClick={() => navigate("/student")}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <AccountBoxIcon></AccountBoxIcon>
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                onClick={() => navigate("/student/profile")}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <FeedIcon></FeedIcon>
              </ListItemIcon>
              <ListItemText
                primary="Articles"
                onClick={() => navigate("/student/articles")}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <QuizIcon></QuizIcon>
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <BookIcon></BookIcon>
              </ListItemIcon>
              <ListItemText primary="Subjects" />
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <SchoolIcon></SchoolIcon>
              </ListItemIcon>
              <ListItemText primary="Experts" onClick={handleShowExperts} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <PeopleIcon></PeopleIcon>
              </ListItemIcon>
              <ListItemText primary="Followers" onClick={handleShowFollowers} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <DirectionsRunIcon></DirectionsRunIcon>
              </ListItemIcon>
              <ListItemText
                primary="Followings"
                onClick={handleShowFollowings}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <PeopleOutlineIcon></PeopleOutlineIcon>
              </ListItemIcon>
              <ListItemText primary="Friends" onClick={handleShowFriends} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{display: {md: "none", lg: "block"}}}>
                <SettingsIcon></SettingsIcon>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
        <NightlightIcon></NightlightIcon>
              </ListItemIcon>
              <Switch  defaultChecked  />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
