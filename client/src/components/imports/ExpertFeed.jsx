import { Box } from "@mui/system";
import { useEffect } from "react";
import ViewPosts from "./ViewPosts";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/features/articleSlice";
import { Typography } from "@mui/material";

export default function ExpertFeed() {
  const { articles, loading } = useSelector((state) => ({ ...state.article }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <Box flex={4} sx={{ backgroundColor: "#fffff" }}>
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
        {articles.length} Articles by Students{" "}
      </Typography>

      {articles.map((item, index) => {
        return <ViewPosts key={index} {...item} />;
      })}
    </Box>
  );
}
