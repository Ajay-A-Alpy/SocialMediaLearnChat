import { Box ,styled,} from "@mui/system";
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';



export default function ProfileData({edit,setEdit}){
    

    return (
       
        <Box flex={4} sx={{backgroundColor:"", height:"100vh" }}>
            <Stack direction={{xs:"column" ,sm:"row"}} spacing={4} >
                <Box flex={2} sx={{backgroundColor:"white", height:"100vh", display:{xs:"block",sm:"block"}}}>
                    <Box sx={{height:"",width:"90%",alignItems:"center", paddingTop:{xs:"10%",sm:"35%"} ,  justifyContent:"center",display:"flex"}}>
                     <img  style={{width:"90%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRW8MprfJzvyxKiP8t7o1E-LKC9NkPEVClQ&usqp=CAU"/>
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






                <Box flex={4} sx={{backgroundColor:"", height:"100vh"}}>
                    <Box sx={{backgroundColor:"white", height:"auto",textAlign:"center"}}>
                        <Typography component="h5" variant="h5" color="white" sx={{width:"100%", backgroundColor:"#34568B"}}>
                            Personal Info   <span style={{marginLeft:"3rem",color:"white"}}><EditIcon onclick={()=>{setEdit(true)}}></EditIcon></span>
                        </Typography>
                     
                       <Stack direction="column">
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         Name 
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       Rahul
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        Email
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         rahul@gmil.com
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       Mobile
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         9495848525
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                     Place
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         Kochi
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                   DOB
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         12/02/1996
                        </Typography>
                        </Stack>

                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
               Hobbies
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                         Reading books,playing football 
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
                       10th
                        </Typography>
                        </Stack>
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                  School/college
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        National Public School,Kochi
                        </Typography>
                        </Stack>
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                Interested Topics
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        Maths,English,Chemistry
                        </Typography>
                        </Stack>
                      
                            </Stack>
                    </Box>
                    </Box>


            </Stack>

        </Box>
    )


    
}