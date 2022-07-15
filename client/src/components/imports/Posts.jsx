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
import {deleteArticle, updateArticle} from "../../redux/features/articleSlice";
import {followOne, getStudentProfile} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {likeArticle, unlikeArticle} from "../../redux/features/articleSlice";
import {getArticles} from "../../redux/features/articleSlice";
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
}) {
  const initials = {
    title1: title,
    subject1: subject,
    description1: description,
    id: _id,
  };

  const [modal, setModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [articleData, setArticleData] = useState(initials);
  const {title1, subject1, description1, id} = articleData;
  const [likeChange, setLikeChange] = useState(false);
  const {error, loading} = useSelector((state) => ({...state.article}));

  useEffect(() => {
    dispatch(getArticles());
  }, [likeChange]);

  const [imageField, setImageField] = useState();

  const {user} = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInutChange = (e) => {
    const {name, value} = e.target;
    setArticleData({...articleData, [name]: value});
  };

  const handleClear = () => {
    setArticleData({});
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
    toast.success("Article deleted");
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
      user: user.result._id,
    };
    console.log("like button pressed");
    dispatch(likeArticle(data));
    setLikeChange(!likeChange);
  };

  const handleUnlike = () => {
    let data = {
      post: _id,
      user: user.result._id,
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
              {user.result._id == userId ? (
                <Avatar
                  sx={{bgcolor: "red"}}
                  aria-label="recipe"
                  src={
                    user?.result.profilePic
                      ? "http://localhost:5000/" + user?.result.profilePic
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
                      user?.result.profilePic
                        ? "http://localhost:5000/" + user?.result.profilePic
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
              {user.result?._id == userId ? (
                <Tooltip title="Edit" placement="left">
                  <MoreVertIcon onClick={() => setModal(true)} />
                </Tooltip>
              ) : (
                ""
              )}
              {user.result._id == userId ? (
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
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
          {likes.includes(user.result._id) && loading == false ? (
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
                {loading ? <CircularProgress /> : <FavoriteBorder />}
              </Tooltip>
              {likes.length}
            </IconButton>
          )}

          <IconButton aria-label="verify">
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
            <Checkbox icon={<CommentIcon></CommentIcon>} />
          </IconButton>
        </CardActions>
      </Card>

      <Box>
        <ModalStyled
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              width: {xs: "90%", sm: "40%"},
              height: {xs: "90%", sm: "70%"},
              backgroundColor: "white",
              borderRadius: "",
              padding: "auto",
            }}
          >
            <Typography
              sx={{padding: "3rem"}}
              fontWeight={400}
              color="gray"
              textAlign="center"
              variant="h5"
            >
              Edit Article
            </Typography>

            <UserBox>
              <Stack direction="column" sx={{width: "100%"}} gap={2}>
                <TextField
                  placeholder="Title"
                  variant="standard"
                  name="title1"
                  value={title1}
                  onChange={onInutChange}
                  sx={{padding: "", width: "100%"}}
                />
                <TextField
                  placeholder="Subject"
                  variant="standard"
                  name="subject1"
                  value={subject1}
                  onChange={onInutChange}
                  sx={{padding: "", width: "100%"}}
                />
                <TextField
                  placeholder="Description"
                  variant="standard"
                  name="description1"
                  value={description1}
                  onChange={onInutChange}
                  multiline
                  rows={4}
                  sx={{padding: "", width: "100%"}}
                />
              </Stack>
            </UserBox>
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
                Update
              </Button>
            </Stack>
          </Box>
        </ModalStyled>
      </Box>

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
    </>
  );
}
