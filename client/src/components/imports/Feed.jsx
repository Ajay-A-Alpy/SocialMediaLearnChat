import { Box } from "@mui/system";
import Posts from "./Posts";
import AddPost from "./AddPost";





export default function Feed(){

    return(
<Box flex={4} sx={{backgroundColor:"white"}}>
    <AddPost></AddPost>
    <Posts></Posts>
    <Posts></Posts>
    <Posts></Posts>
    <Posts></Posts>
    
</Box>
    )


}