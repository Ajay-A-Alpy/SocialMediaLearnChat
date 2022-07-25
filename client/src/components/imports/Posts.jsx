import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CommentIcon from "@mui/icons-material/Comment";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Checkbox, Tooltip} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import GppGoodIcon from "@mui/icons-material/GppGood";

import {Box, Button, Stack, Typography, styled} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {
  commentArticle,
  deleteArticle,
  updateArticle,
} from "../../redux/features/articleSlice";
import {followOne, getStudentProfile} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {likeArticle, unlikeArticle} from "../../redux/features/articleSlice";
import {getArticles} from "../../redux/features/articleSlice";
import {useRef} from "react";
export default function Posts({
  title,
  subject,
  username,
  images,
  description,
  createdAt,
  userId,
  _id,
  verifiedCount,
  likes,
  comments,
}) {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [open, setOpen] = useState(false);
  const [title1, setTitle] = useState(title);
  const [subject1, setSubject] = useState(subject);
  const [description1, setDescription] = useState(description);

  const [likeChange, setLikeChange] = useState(false);
  const {error, loading} = useSelector((state) => ({...state.article}));

  useEffect(() => {
    dispatch(getArticles());
  }, [likeChange]);

  const [imageField, setImageField] = useState();

  const {user} = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitComment = () => {
    console.log(commentText);

    let newComment = {
      commentorId: user?.result._id,
      text: commentText,
      commentedAt: Date.now(),
      postId: _id,
      commentedBy: user?.result.name,
    };

    if (commentText !== "") {
      dispatch(commentArticle(newComment));
      setComment(false);
      setLikeChange(!likeChange);
    }
  };

  const handleClear = () => {
    setTitle("");
    setSubject("");
    setDescription("");
  };

  const imageHandler = (e) => {
    setImageField(e.target.files[0]);
  };

  const handleDelete = () => {
    let id = _id;
    setOpen(false);
    dispatch(deleteArticle({id}));
    navigate("/student");
    setLikeChange(!likeChange);
    toast.success("Article deleted", {autoClose: 1000});
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", imageField);
    fd.append("title", title1);
    fd.append("subject", subject1);
    fd.append("description", description1);
    fd.append("username", user?.result?.name);
    fd.append("userId", user?.result?._id);

    if (title1 && subject1 && description1) {
      let id = _id;
      dispatch(updateArticle({fd, id, navigate, toast}));
      dispatch(getArticles());
      handleClear();
      setModal(false);
      navigate("/student");
    }
  };

  const handleViewProfile = () => {
    dispatch(getStudentProfile({userId, navigate}));
  };

  const handleLike = () => {
    let data = {
      post: _id,
      user: user?.result?._id,
    };
    console.log("like button pressed");
    dispatch(likeArticle(data));
    setLikeChange(!likeChange);
  };

  const handleUnlike = () => {
    let data = {
      post: _id,
      user: user?.result._id,
    };
    console.log("unlike button pressed");
    dispatch(unlikeArticle(data));
    setLikeChange(!likeChange);
  };

  const ModalStyled = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const Input = styled("input")({
    display: "none",
  });

  const UserBox = styled(Box)({
    display: "flex",

    alignItems: "center",
    paddingInline: "3rem",
    marginTop: "0",
  });

  return (
    <>
      <Card sx={{margin: 5}}>
        <CardHeader
          avatar={
            <Box>
              {user?.result._id == userId ? (
                <Avatar
                  sx={{bgcolor: "red"}}
                  aria-label="recipe"
                  src={
                    user?.result.profilePic
                      ? "http://localhost:5000/" + user?.result?.profilePic
                      : "http://localhost:5000/profile.jpg"
                  }
                ></Avatar>
              ) : (
                <Tooltip
                  title="view Profile"
                  placement="top"
                  onClick={handleViewProfile}
                >
                  <Avatar
                    sx={{bgcolor: "red"}}
                    aria-label="recipe"
                    src={
                      user?.result?.profilePic
                        ? "http://localhost:5000/" + user?.result?.profilePic
                        : "http://localhost:5000/profile.jpg"
                    }
                  >
                    {username}
                  </Avatar>
                </Tooltip>
              )}
            </Box>
          }
          action={
            <IconButton aria-label="settings">
              {user?.result?._id == userId ? (
                <Tooltip title="Edit" placement="left">
                  <MoreVertIcon onClick={() => setModal(true)} />
                </Tooltip>
              ) : (
                ""
              )}
              {user?.result?._id == userId ? (
                <Tooltip
                  title="Delete"
                  placement="left"
                  sx={{marginLeft: "1rem"}}
                >
                  <DeleteIcon onClick={() => setOpen(true)} />
                </Tooltip>
              ) : (
                ""
              )}
            </IconButton>
          }
          title={username}
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
          <Typography>{"Sub: " + subject}</Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.primary">
            {description}
          </Typography>
          <Box
            sx={{
              dispay: "block",
              width: "100%",
              textAlign: "end",
            }}
          >
            <Typography
              sx={{cursor: "pointer"}}
              onClick={() => {
                setShowComment(true);
              }}
            >
              Comments
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
          {likes.includes(user?.result._id) && loading == false ? (
            <IconButton aria-label="unlike">
              <Tooltip
                title="unlike"
                placement="left"
                sx={{marginLeft: "1rem"}}
                onClick={handleUnlike}
              >
                {loading ? <CircularProgress /> : <Favorite />}
              </Tooltip>
              {likes.length}
            </IconButton>
          ) : (
            <IconButton aria-label="like">
              <Tooltip
                title="like"
                placement="left"
                sx={{marginLeft: "1rem"}}
                onClick={handleLike}
              >
                {<FavoriteBorder />}
              </Tooltip>
              {likes.length}
            </IconButton>
          )}

          <IconButton aria-label="verify" sx={{cursor: "default"}}>
            <Tooltip
              title="verification by experts"
              placement="left"
              sx={{marginLeft: "1rem"}}
            >
              {<GppGoodIcon></GppGoodIcon>}
            </Tooltip>
            {verifiedCount.length}
          </IconButton>

          <IconButton aria-label="comment">
            <Tooltip
              title="comment"
              placement="left"
              sx={{marginLeft: "1rem"}}
              onClick={() => {
                setComment(true);
              }}
            >
              <CommentIcon />
            </Tooltip>
            {comments.length}
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={modal}>
        <DialogTitle sx={{width: "100%", textAlign: "center"}}>
          Edit Article
        </DialogTitle>
        <DialogContent>
          <Box className="Article_form">
            <TextField
              autoFocus
              margin="dense"
              name="title1"
              label="Title"
              fullWidth
              variant="standard"
              value={title1}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              label="Subject"
              name="subject1"
              value={subject1}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              sx={{padding: "", width: "100%"}}
            />
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              label="Description"
              name="description1"
              value={description1}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              multiline
              rows={4}
              sx={{padding: "", width: "100%"}}
            />
          </Box>
          <Stack
            direction="row"
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-around",
            }}
            gap={1}
            mb={0}
            p={3}
          >
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                name="image"
                onChange={imageHandler}
              />
              <Button
                variant="contained"
                component="span"
                endIcon={<AddPhotoAlternateIcon></AddPhotoAlternateIcon>}
              >
                Upload
              </Button>
            </label>

            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={handlePost}
            >
              Post
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted you cannot see article
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={comment}>
        <DialogTitle>Add comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Follow the rules while comment</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            name="comment"
            label="comment"
            type="text"
            fullWidth
            variant="standard"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComment(false)}>close</Button>
          <Button onClick={handleSubmitComment}>Send</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showComment}>
        <DialogTitle> {comments.length + " comment"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {comments?.map((c) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "400px",
                    height: "auto",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      border: "beige",
                      boxSizing: "border-box",
                      minWidth: "300px",
                      border: "1px solid black",
                      margin: "1rem",
                      borderRadius: "8px",
                      padding: "5px",
                    }}
                  >
                    <Avatar sx={{backgroundColor: "orange"}}>
                      {c.commentedBy}
                    </Avatar>
                    <Typography>{c.commentedBy}</Typography>
                    <Typography variant="h6" color="black">
                      {c.text}
                    </Typography>

                    <Typography>{c.createdAt}</Typography>
                  </Box>
                </Box>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowComment(false)}>close</Button>
          {/* <Button onClick={handleSubmitComment}>Send</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
