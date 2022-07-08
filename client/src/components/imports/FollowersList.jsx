import React from 'react'
import { Box } from '@mui/system';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function FollowersList() {




  return (

    <Box flex={6} sx={{ backgroundColor: "#393f4d" }}>

<List sx={{ width: '80%', bgcolor: 'background.paper'  ,height:"100vh"}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
         
        />
        <Button>Unfollow</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
     
    </List>





    </Box>
  
  )
}

export default FollowersList