import {Box} from "@mui/system";
import {useEffect} from "react";
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import {getArticles} from "../../redux/features/articleSlice";
import {CircularProgress, Stack, Typography} from "@mui/material";

export default function Feed() {
  const {articles, loading} = useSelector((state) => ({...state.article}));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("feed articles");
    dispatch(getArticles());
  }, []);

  return (
    <>
      <Stack
        direction="column"
        flex={4}
        sx={{
          backgroundColor: "#F2F2F2",
        }}
      >
        <Box sx={{height: "2rem", position: "sticky"}}></Box>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
          }}
        >
          {articles?.map((item) => {
            return <Posts key={item._id} {...item} />;
          })}
        </Box>
      </Stack>
    </>
  );
}
