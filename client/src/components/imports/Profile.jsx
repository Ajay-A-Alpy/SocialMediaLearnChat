import { Box,Button,Stack, TextField, Typography } from "@mui/material";


export default function ProfileEdit(){

     

    return(
        <Box flex={4} sx={{backgroundColor:"white"}}>
           <Stack direction="column" spacing={2} sx={{height:"auto" ,width:"80%", alignItems:"center" ,paddingBottom:"2rem"}}>
           <Typography variant="h5" component="h5" >YOUR PROFILE</Typography>
     <Box  bgcolor="powderblue" sx={{width:"100%", textAlign:"center"}}><Typography variant="h6" component="h6" >Personal Info</Typography> </Box>    
<TextField

          id="outlined-required"
          label="Name"/>
         

<TextField
          id="outlined-required"
          label="Email"/>

<TextField
          id="outlined-required"
          label="Mobile"/>

<TextField
          id="outlined-required"
          label="Place"/>
  <Box  bgcolor="powderblue" sx={{width:"100%", textAlign:"center"}}><Typography variant="h6" component="h6" >Educational Info</Typography> </Box>    
<TextField
          id="outlined-required"
          label="Class"/>

{/* <TextField  
       id="outlined-required"
       label="Age"/> */}

<TextField
          id="outlined-required"
          label="School/College"/>

<TextField
       id="outlined-required"
       label="Interested Subject"/>

<TextField
       id="outlined-required"
       label="Hobbies"/>

<Button variant="contained"  type='submit' color="primary" >Submit</Button>


</Stack>
    </Box>
    )


}