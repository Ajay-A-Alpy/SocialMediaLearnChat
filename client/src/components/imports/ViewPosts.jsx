import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Checkbox, Tooltip } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function ViewPosts({
  title,
  subject,
  username,
  images,
  description,
  createdAt,
  userId,
  _id,
}) {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon></ThumbUpIcon>
        </IconButton>
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        </IconButton>
       
      </CardActions>
    </Card>
  );
}
