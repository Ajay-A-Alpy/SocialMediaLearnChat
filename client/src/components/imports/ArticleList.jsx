import React from "react";
import {useEffect} from "react";
import {Box, Stack, styled, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import Posts from "./Posts";
import {getArticles} from "../../redux/features/articleSlice";
function ArticleList() {
  const {articles, loading} = useSelector((state) => ({...state.article}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  const UserBox = styled(Box)({backgroundColor: "#d4d4dc"});
  return (
    <Box flex={4} sx={{backgroundColor: "#d4d4dc"}}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          minHeight: "100vh",
          width: "100%",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
        {user &&
          articles.map((item, index) => {
            if (user?.result?._id == item.userId) {
              return (
                <UserBox>
                  <Posts key={item._id} {...item}></Posts>
                </UserBox>
              );
            }
          })}
      </Stack>
    </Box>
  );
}

export default ArticleList;
