import {Box} from "@mui/system";
import {useEffect} from "react";
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import {getArticles} from "../../redux/features/articleSlice";
import {CircularProgress, Typography} from "@mui/material";

export default function Feed() {
  const {articles, loading} = useSelector((state) => ({...state.article}));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <Box flex={4} sx={{backgroundColor: "#0071c5"}}>
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
        {/* {loading ? <CircularProgress /> : articles.length + " Articles"} */}
      </Typography>

      {articles.map((item, index) => {
        return <Posts key={item._id} {...item} />;
      })}
    </Box>
  );
}
