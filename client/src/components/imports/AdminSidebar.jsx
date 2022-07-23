import {Box, Paper} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {useNavigate} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FeedIcon from "@mui/icons-material/Feed";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import NightlightIcon from "@mui/icons-material/Nightlight";

import {useSelector} from "react-redux";

function AdminSidebar() {
  const {admin} = useSelector((state) => ({...state.admin}));
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
      bgcolor="#d4d4dc"
      p={2}
      sx={{display: {xs: "none", sm: "block"}}}
    >
      <Box sx={{position: "fixed"}}>
        <Paper
          elevation={10}
          sx={{
            height: "85vh",
            width: "12rem",
            backgroundColor: "whitesmoke",
            borderRadius: "2rem",
            textAlign: "center",
          }}
        >
          <List>
            {admin ? (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    sx={{fontSize: "2rem"}}
                    primary={"Hello  " + admin?.result?.name}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon></HomeIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  onClick={() => navigate("/admin")}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon></AccountBoxIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  onClick={() => navigate("/admin/profile")}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FeedIcon></FeedIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Articles"
                  onClick={() => navigate("/admin/articles")}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QuizIcon></QuizIcon>
                </ListItemIcon>
                <ListItemText primary="Questions" />
              </ListItemButton>
            </ListItem>

            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon></BookIcon>
                </ListItemIcon>
                <ListItemText primary="Subjects" />
              </ListItemButton>
            </ListItem> */}

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon></SchoolIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Experts"
                  onClick={() => navigate("/admin/experts")}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleOutlineIcon></PeopleOutlineIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Students"
                  onClick={() => navigate("/admin/students")}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
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
        </Paper>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
