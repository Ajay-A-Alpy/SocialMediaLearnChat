import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddPost from "./AddPost";

function Rightbar(){

return(
    <Box flex={2} bgcolor="#d4d4dc" sx={{display:{xs:"none", sm:"block"}}} p={2}>
     
     <Box sx={{position:"fixed"}}>
     <AddPost></AddPost>
     </Box>
    </Box>
)

}

export default Rightbar