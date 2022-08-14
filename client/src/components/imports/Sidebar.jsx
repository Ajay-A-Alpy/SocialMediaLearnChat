import {Box} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FeedIcon from "@mui/icons-material/Feed";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/School";
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
      bgcolor="#F2F2F2"
      p={2}
      sx={{display: {xs: "none", sm: "none", md: "block"}}}
    >
      <Box sx={{height: "1rem"}}></Box>
      <Box
        sx={{
          position: "fixed",
          width: "auto",
          paddingRight: "3rem",

          height: "100vh",
        }}
      >
        <List>
          {user ? (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  primary={user?.result.name.toUpperCase()}
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
              <ListItemText
                primary="Questions"
                onClick={() => navigate("/student/questions")}
              />
            </ListItemButton>
          </ListItem>

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
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
