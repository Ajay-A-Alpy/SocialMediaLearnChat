import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { Link,useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FeedIcon from '@mui/icons-material/Feed';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import NightlightIcon from '@mui/icons-material/Nightlight';

import { useSelector } from "react-redux";



function ExpertSidebar(){
    const {expert}=useSelector((state)=>({...state.expertAuth}))
  const navigate=useNavigate()

return (
    <Box flex={1}  bgcolor="#d4d4dc" p={2} sx={{display:{xs:"none", sm:"block"}}  } >
        <Box sx={{position:"fixed"}}>
      <List>
{expert ? <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText sx={{fontSize:"2rem"}} primary={ "Hello Expert "+expert?.result?.name} />
            </ListItemButton>
          </ListItem> : ""
}

      
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <HomeIcon></HomeIcon>
              </ListItemIcon>
            <ListItemText  primary="Home" onClick={()=>navigate('/expert')} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <AccountBoxIcon></AccountBoxIcon>
              </ListItemIcon >
        <ListItemText  primary="Profile" onClick={()=>navigate('/expert/profile')} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
             <FeedIcon></FeedIcon>
              </ListItemIcon>
              <ListItemText primary="Articles"  onClick={()=>navigate('/expert/articles')} />
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

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
            <BookIcon></BookIcon>
              </ListItemIcon>
              <ListItemText primary="Subjects" />
            </ListItemButton>
          </ListItem>
{/* 
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon></SchoolIcon>
              </ListItemIcon>
              <ListItemText primary="Tutors" />
            </ListItemButton>
          </ListItem> */}
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
           <PeopleIcon></PeopleIcon>
              </ListItemIcon>
              <ListItemText primary="Followers" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
           <DirectionsRunIcon></DirectionsRunIcon>
              </ListItemIcon>
              <ListItemText primary="Followings" />
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
           <PeopleOutlineIcon></PeopleOutlineIcon>
              </ListItemIcon>
              <ListItemText primary="Students" />
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
        </Box>
    </Box>
)

}

export default ExpertSidebar