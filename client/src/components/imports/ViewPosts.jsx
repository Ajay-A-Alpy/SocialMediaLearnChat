import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useSelector, useDispatch} from "react-redux";
import {Checkbox, Tooltip} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import CommentIcon from "@mui/icons-material/Comment";
import GppGoodIcon from "@mui/icons-material/GppGood";
import {verifyArticle} from "../../redux/features/articleSlice";
import {unVerifyArticle} from "../../redux/features/articleSlice";
import {useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {getArticles} from "../../redux/features/articleSlice";

export default function ViewPosts({
  title,
  subject,
  username,
  images,
  description,
  createdAt,
  likes,
  verifiedCount,
  _id,
}) {
  const {error, loading} = useSelector(state => ({...state.article}));

  const [likeChange, setLikeChange] = useState(false);

  const {expert} = useSelector(state => ({...state.expertAuth}));
  useEffect(() => {
    dispatch(getArticles());
  }, [likeChange]);

  const dispatch = useDispatch();
  const handleVerify = () => {
    let data = {
      post: _id,
      user: expert.result._id,
    };

    console.log("verify button pressed");
    dispatch(verifyArticle(data));
    setLikeChange(!likeChange);
  };

  const handleUnverify = () => {
    let data = {
      post: _id,
      user: expert.result._id,
    };

    console.log("unverify button pressed");

    dispatch(unVerifyArticle(data));
    setLikeChange(!likeChange);
  };

  return (
    <Card sx={{margin: 5}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
            {username}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
        subheader={createdAt.substring(0, 10)}
      />
      {images ? (
        <CardMedia
          component="img"
          height="20%"
          // src="https://ontheworldmap.com/world-map-1750.jpg"
          src={require(`../../../../server/uploads/${images}`)}
          // src={`http://localhost:5000/${images}`}
          alt="Paella dish"
        />
      ) : (
        ""
      )}
      <CardContent>
        <Typography font>{"Sub: " + subject}</Typography>
        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
        <IconButton aria-label="add to favorites">
          <FavoriteBorder />
          {likes.length}
        </IconButton>

        {verifiedCount.includes(expert.result._id) && loading == false ? (
          <IconButton aria-label="unverify">
            <Tooltip
              title="unverify"
              placement="left"
              sx={{marginLeft: "1rem"}}
              onClick={handleUnverify}
            >
              {loading ? <CircularProgress /> : <GppGoodIcon></GppGoodIcon>}
            </Tooltip>
            {verifiedCount.length}
          </IconButton>
        ) : (
          <IconButton aria-label="verify">
            <Tooltip
              title="verify"
              placement="left"
              sx={{marginLeft: "1rem"}}
              onClick={handleVerify}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <VerifiedUserOutlinedIcon></VerifiedUserOutlinedIcon>
              )}
            </Tooltip>
            {verifiedCount.length}
          </IconButton>
        )}

        <IconButton aria-label="comment">
          <Checkbox icon={<CommentIcon></CommentIcon>} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
