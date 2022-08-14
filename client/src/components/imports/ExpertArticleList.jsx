import React from "react";
import {useEffect, useState} from "react";
import {Box, Stack, styled} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";

import {getArticles} from "../../redux/features/articleSlice";
import ViewPosts from "./ViewPosts";
function ExpertArticleList() {
  const {articles} = useSelector((state) => ({...state.article}));
  const {expert} = useSelector((state) => ({...state.expertAuth}));

  const dispatch = useDispatch();
  const [articleList, setArticleList] = useState([]);
  //   useEffect(() => {
  //     let unsubscribed = false;
  //     if (!unsubscribed) {
  //       console.log("expert listttttttttttttttt");
  //       dispatch(getArticles());
  //       setArticleList(articles);
  //     }
  //     return () => {
  //       console.log("cleanupppppp");
  //       unsubscribed = true;
  //     };
  //   }, [articleList]);

  const UserBox = styled(Box)({backgroundColor: "#d4d4dc"});
  return (
    <Box flex={4} sx={{backgroundColor: ""}}>
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
        {expert &&
          articles.map((item) => {
            if (expert?.result?._id == item.userId) {
              return (
                <UserBox>
                  <ViewPosts key={item._id} {...item} />;
                </UserBox>
              );
            }
          })}
      </Stack>
    </Box>
  );
}

export default ExpertArticleList;
