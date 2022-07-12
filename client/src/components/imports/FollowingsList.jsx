import React from 'react'
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';


function FollowingsList() {

    const [followingList,setFollowings]=useState([])

    const { followings}=useSelector((state)=>({...state.auth}))
  
    useEffect(()=>{
     setFollowings(followings)
  console.log(followingList)
    },[])

  return (
    <Box flex={6} sx={{ backgroundColor: "", maxHeight:"100vh" }}>
    {
      followingList.map((item,index)=>{
        return(
          <List sx={{ width:'80%', bgcolor:'background.paper',height:"auto"}}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={item.person.name} secondary={item.person.email}
      />
      <Button>Unfollow</Button>
    </ListItem>
    <Divider variant="inset" component="li" />
  </List>
        )
      })
    }
  </Box>
    
  )
}

export default FollowingsList