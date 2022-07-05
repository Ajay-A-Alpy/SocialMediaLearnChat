import { Box } from "@mui/system";
import Posts from "./Posts";



export default function Feed(){

    return(
        
<Box flex={4} sx={{backgroundColor:"#393f4d"}}> 

    <Posts></Posts>
    <Posts></Posts>
    <Posts></Posts>
    <Posts></Posts>
    
</Box>
    )


}