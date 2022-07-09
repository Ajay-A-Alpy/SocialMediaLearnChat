import { Box } from "@mui/system";
import { useEffect } from "react";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/features/articleSlice";
import { Typography } from "@mui/material";

export default function Feed() {
  const { articles, loading } = useSelector((state) => ({ ...state.article }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('articlessss callllllll')
    dispatch(getArticles());
  }, []);

  return (
    <Box flex={4} sx={{ backgroundColor: "#393f4d" }}>
      <Typography
        fontSize="2rem"
        sx={{
          height: "3rem",
          dispay: "block",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        {articles.length} Articles
      </Typography>

      {articles.map((item,index) => {
        return <Posts key={item._id} {...item} />;
      })}
    </Box>
  );
}
