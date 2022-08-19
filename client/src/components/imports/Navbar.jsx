import {AppBar, styled, Toolbar, Typography, Box, Stack} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

import Avatar from "@mui/material/Avatar";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

import {useState} from "react";
import Drawer from "@mui/material/Drawer";
import {
  getFollowersData,
  getFollowingsData,
  getStudentProfile,
  setLogout,
} from "../../redux/features/authSlice";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FeedIcon from "@mui/icons-material/Feed";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import decode from "jwt-decode";

import SearchIcon from "@mui/icons-material/Search";
import {useEffect} from "react";
import * as api from "../../redux/api";

export default function Navbar({chatStatus}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const {user} = useSelector((state) => ({...state.auth}));
  const token =
    JSON.parse(localStorage.getItem("userToken")) ||
    JSON.parse(localStorage.getItem("expertToken"));

  if (token) {
    let decodeToken = decode(token);
    if (decodeToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
      navigate("/");
    }
  }

  const handleViewProfile = (id) => {
    let userId = id;

    dispatch(getStudentProfile({userId, navigate}));
    setQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    let callAPI = async () => {
      let obj = {
        query,
      };
      let result = await api.searchUser(obj);
      setData(result.data?.result);
      console.log(result);
    };
    let unsubscribed = false;
    if (!unsubscribed) {
      callAPI();
    }
    return () => {
      unsubscribed = true;
    };
  }, [query]);
  const SyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  const Search = styled("div")({
    backgroundColor: "white",
    borderRadius: "2rem",
    padding: "0 1rem",
    width: "40%",
    height: "2rem",
  });
  const Icons = styled("div")({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  });

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

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
    <>
      <AppBar position="sticky" sx={{bgcolor: "#764AF1"}}>
        <SyledToolbar>
          <Typography
            variant="h6"
            sx={{display: {xs: "none", sm: "block"}, cursor: "pointer"}}
            onClick={() => {
              navigate("/");
            }}
          >
            Learn-Chat
          </Typography>
          <HomeIcon
            sx={{display: {xs: "block", sm: "block", md: "none"}}}
            onClick={() => setDrawer(true)}
          ></HomeIcon>
          <Search>
            {chatStatus ? (
              ""
            ) : (
              <InputBase
                autoFocus
                margin="dense"
                label="search"
                variant="standard"
                value={query}
                onChange={handleSearch}
                sx={{marginY: "auto"}}
              ></InputBase>
            )}

            {query && (
              <Stack
                direction="column"
                sx={{
                  maxHeight: "300px",
                  width: "100%",
                  backgroundColor: "#F2F2F2",
                  color: "black",
                  overflowY: "hidden",
                }}
              >
                {data &&
                  data?.map((item) => {
                    return (
                      <Box
                        onClick={handleViewProfile.bind(this, item._id)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "white",
                          display: "flex",
                        }}
                      >
                        <SearchIcon></SearchIcon>
                        <Avatar
                          src={
                            item.profilePic
                              ? "http://localhost:5000/" + item.profilePic
                              : "http://localhost:5000/profile.jpg"
                          }
                        ></Avatar>
                        <Typography key={item._id}>{item.name}</Typography>{" "}
                      </Box>
                    );
                  })}
              </Stack>
            )}
          </Search>
          <Icons>
            <Badge
              color="error"
              sx={{display: {xs: "none", sm: "block", cursor: "pointer"}}}
            >
              <MapsUgcIcon
                onClick={() => {
                  navigate("/messenger");
                }}
              ></MapsUgcIcon>
            </Badge>

            <Box
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{display: "flex"}}
            >
              <Avatar
                sx={{width: "3rem", height: "3rem", cursor: "pointer"}}
                padding="0 0 2rem 0"
                onClick={() => {}}
                src={
                  user?.result?.profilePic
                    ? "http://localhost:5000/" + user?.result?.profilePic
                    : "http://localhost:5000/profile.jpg"
                }
              ></Avatar>
              <Typography
                variant="subtitle1"
                sx={{display: {xs: "block", sm: "none"}}}
              >
                Mark
              </Typography>

              <Typography
                onClick={handleLogout}
                sx={{
                  color: "white",
                  cursor: "pointer",
                  margin: "auto",
                  padding: "1px",
                  display: {xs: "none", sm: "block"},
                }}
              >
                Logout
              </Typography>
            </Box>
          </Icons>
        </SyledToolbar>
      </AppBar>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <List
          sx={{backgroundColor: "#304352", color: "white", minHeight: "100vh"}}
        >
          {user ? (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "white"}}></ListItemIcon>
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
      </Drawer>
    </>
  );
}
