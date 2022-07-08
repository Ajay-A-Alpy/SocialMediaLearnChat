import React from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Posts from "./Posts";

function ArticleList() {
  const { articles, loading } = useSelector((state) => ({ ...state.article }))
  const {user}=useSelector((state)=>({...state.auth}))

  const UserBox = styled(Box)({backgroundColor:"#d4d4dc"

  });
  return (
    <Box flex={4} sx={{ backgroundColor: "#d4d4dc" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          height: "auto",
          width: "100%",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
         <Typography variant="h5" color="blue" sx={{display:"block", textAlign:"center"}}>My Articles</Typography>

        {
            user && articles.map((item,index)=>{
                if(user?.result?._id==item.userId){
                    return(

                        <UserBox>
                           
                            <Posts key={item._id}   {...item}></Posts>
                        </UserBox>
                    )



                }
            })
        }
      
       
      </Stack>
    </Box>
  );
}

export default ArticleList;
