import {Box} from "@mui/system";
import {useEffect} from "react";
import ViewPosts from "./ViewPosts";
import {useDispatch, useSelector} from "react-redux";
import {getArticles} from "../../redux/features/articleSlice";
import {Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
export default function ExpertFeed() {
  const {articles, loading} = useSelector((state) => ({...state.article}));

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      dispatch(getArticles());
    }
    return () => {
      unsubscribed = true;
    };
  }, []);

  return (
    <Box flex={4} sx={{backgroundColor: "#F2F2F2", minHeight: "100vh"}}>
      <Typography
        fontSize="2rem"
        sx={{
          height: "3rem",
          dispay: "block",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      ></Typography>
      {loading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height="70%" />
        </>
      ) : (
        ""
      )}
      {articles?.map((item, index) => {
        return <ViewPosts key={index} {...item} />;
      })}

      {articles.length === 0 ? (
        " "
      ) : (
        <Box sx={{height: "2rem", position: "sticky"}}> No articles Found</Box>
      )}
    </Box>
  );
}
