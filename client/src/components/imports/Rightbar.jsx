import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function Rightbar(){

return(
    <Box flex={2} bgcolor="white" sx={{display:{xs:"none", sm:"block"}}} p={2}>
     <Box sx={{position:"fixed"}}>
       <Typography variant="h6" fontWeight={200}> Online Friends</Typography>
       <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src="" />
      <Avatar alt="Travis Howard" src=""/>
      <Avatar alt="Cindy Baker" src="" />
      <Avatar alt="Agnes Walker" src="" />
      <Avatar alt="Trevor Henderson" src=""/>
    </AvatarGroup>
     </Box>
    </Box>
)

}

export default Rightbar