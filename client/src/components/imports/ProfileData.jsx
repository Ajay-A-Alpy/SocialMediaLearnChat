import { Box ,styled,} from "@mui/system";
import Stack from '@mui/material/Stack';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ProfileEdit from "./ProfileEdit";

import { useState } from "react";
import { useSelector } from "react-redux";
 

export default function ProfileData(){

    const [edit, setEdit] = useState(false);
    const {user}=useSelector((state)=>({...state.auth}))

    

    return (
       
        <Box flex={4} sx={{backgroundColor:"white", height:"100%" }}>
            <Stack direction={{xs:"column" ,sm:"row"}} spacing={4} >
                <Box flex={2} sx={{backgroundColor:"white", height:"100%", display:{xs:"block",sm:"block"}}}> 
                <Box sx={{dispaly:"block", textAlign:"end"}}> 
                <Tooltip title="Edit Profile" placement="left">
                  <EditIcon  color="white" onClick={()=>{setEdit(!edit)}} >
                  </EditIcon>
               </Tooltip>
                  </Box>
             
                    <Box sx={{height:"",width:"90%",alignItems:"center", paddingTop:{xs:"10%",sm:"25%"} ,  justifyContent:"center",display:"flex"}}>
                     <img  onClick={()=>{setEdit(true)}} style={{width:"90%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRW8MprfJzvyxKiP8t7o1E-LKC9NkPEVClQ&usqp=CAU"/>
                    </Box>
                    <Box sx={{height:"50%",width:"90%",alignItems:"center",justifyContent:"center",display:"flex"}}>
                        <Stack direction="column" sx={{marginTop:"2rem" ,textAlign:"start",position:"relative"}}>
                    <ListItem>
                         <ListItemText primary="Followers" secondary="10" />
                     </ListItem>

                     <ListItem>
                         <ListItemText primary="Followings" secondary="20" />
                     </ListItem>

                     <ListItem>
                         <ListItemText primary="Friends" secondary="10" />
                     </ListItem>
                     </Stack>
                    </Box>
                </Box>




{edit ? <ProfileEdit></ProfileEdit>:  <Box flex={4} sx={{backgroundColor:"", height:"100%"}}>
                    <Box sx={{backgroundColor:"", height:"auto",textAlign:"center"}}>
                        <Typography component="h5" variant="h5" color="white" sx={{width:"100%", backgroundColor:"#34568B"}}>
                            Personal Info  
                        </Typography>
                     
                       <Stack direction="column">
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         Name 
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       {user.result.name}
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        Email
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result.email}
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       Mobile
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result.mobile}
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                     Place
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result?.place}
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                   DOB 
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result?.dob.substring(0,10)}
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
               Hobbies
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result?.hobbies}
                        </Typography>
                        </Stack>
                            </Stack>
                        
                    </Box>
                    <Box sx={{backgroundColor:"white", height:"50%",textAlign:"center" ,padding:"1rem"}}>
                        <Typography component="h5" variant="h5" color="white" sx={{width:"100%", backgroundColor:"#34568B"}}>
                       Educational Info
                        </Typography>

                        <Stack direction="column">

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
              Class
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                    {user.result.classNum}
                        </Typography>
                        </Stack>
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                  School/college
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {user.result?.school}
                        </Typography>
                        </Stack>
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                Interested Topics
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       {user.result?.subjects}
                        </Typography>
                        </Stack>
                      
                            </Stack>
                    </Box>
                    </Box>   }

               
                    


            </Stack>

        </Box>
    )


    
}