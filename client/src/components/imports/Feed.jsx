import {Box} from "@mui/system";
import {useEffect} from "react";
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import {getArticles} from "../../redux/features/articleSlice";
import {CircularProgress, Stack, Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
export default function Feed() {
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
    <>
      <Stack
        direction="column"
        flex={4}
        sx={{
          backgroundColor: "#F2F2F2",
          minHeight: "100vh",
        }}
      >
        <Box sx={{height: "2rem", position: "sticky"}}></Box>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
          }}
        >
          {loading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height="70%" />
            </>
          ) : (
            ""
          )}

          {articles &&
            articles?.map((item) => {
              return <Posts key={item._id} {...item} />;
            })}
          {articles.length === 0 ? (
            " "
          ) : (
            <Box sx={{height: "2rem", position: "sticky"}}>
              {" "}
              No articles Found
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
}
