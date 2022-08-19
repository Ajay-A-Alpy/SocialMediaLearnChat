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

import {Tooltip} from "@mui/material";

import {Box, Button, Stack, Typography, styled} from "@mui/material";
import {format} from "timeago.js";
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

import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  answerQuestion,
  deleteQuestion,
  getQuestions,
} from "../../redux/features/questionSlice";
export default function Questions({
  subject,
  username,
  images,
  description,
  createdAt,
  userId,
  _id,
  answers,
}) {
  const [comment, setComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const [likeChange, setLikeChange] = useState(false);
  const {error, loading} = useSelector((state) => ({...state.article}));

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      dispatch(getQuestions());
    }
    return () => {
      unsubscribed = true;
    };
  }, [likeChange]);

  const {user} = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitAnswer = () => {
    let newAnswer = {
      commentorId: user?.result._id,
      text: commentText,
      commentedAt: Date.now(),
      questionId: _id,
      commentedBy: user?.result.name,
    };

    if (commentText !== "") {
      dispatch(answerQuestion(newAnswer));
      setComment(false);
      setLikeChange(!likeChange);
      setCommentText("");
    }
  };

  const handleDelete = () => {
    let id = _id;
    setOpen(false);
    dispatch(deleteQuestion({id, toast}));
    setLikeChange(!likeChange);
  };

  const handleView = () => {
    setView(true);
  };

  const ModalStyled = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <>
      <List
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          height: "auto",
          margin: "1rem auto",
        }}
        key={_id}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="rounded">
              <QuizIcon sx={{backgroundColor: "blue"}}></QuizIcon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={subject} secondary={description} />
          <Button variant="outlined" onClick={handleView}>
            view
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>

      <ModalStyled
        open={view}
        onClose={() => {
          setView(false);
        }}
      >
        <Card
          sx={{
            margin: 2,
            border: "1px solid #9d81d6",
            width: {xs: "90%", sm: "70%", md: "30%"},
            height: "auto",
          }}
        >
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
                  <Tooltip title="view Profile" placement="top">
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
            subheader={format(createdAt.substring(0, 10))}
          />

          <CardContent>
            <Typography sx={{fontWeight: "400"}}>
              {"Topic : " + subject}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              sx={{fontWeight: "600"}}
            >
              {"Question : " + description}
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
                  setView(false);
                }}
              >
                Answers
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{display: "flex", justifyContent: "space-between"}}
          ></CardActions>
          {images ? (
            <CardMedia
              component="img"
              height="10%"
              // src="https://ontheworldmap.com/world-map-1750.jpg"
              src={require(`../../../../server/uploads/${images}`)}
              // src={`http://localhost:5000/${images}`}
              alt="Paella dish"
            />
          ) : (
            ""
          )}
        </Card>
      </ModalStyled>

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
            Once deleted you cannot see this question
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
        <DialogTitle>Add your Answer</DialogTitle>
        <DialogContent sx={{minHeight: "300px", minWidth: "300px"}}>
          <TextField
            autoFocus
            margin="dense"
            id="Answer"
            name="comment"
            label="Answer"
            type="text"
            multiline
            fullWidth
            variant="standard"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComment(false)}>close</Button>
          <Button onClick={handleSubmitAnswer}>Send</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showComment}>
        <DialogTitle>
          {answers?.length == 0
            ? " No answers Found  "
            : answers.length + " Answers found"}
        </DialogTitle>
        <DialogContent sx={{minHeight: "300px", minWidth: "300px"}}>
          <IconButton
            aria-label="Answer"
            sx={{fontSize: "20px"}}
            onClick={() => {
              setComment(true);
            }}
          >
            <Tooltip
              title=" Post  your Answer "
              placement="right"
              sx={{marginLeft: "1rem"}}
            >
              <CommentIcon />
            </Tooltip>
            Add an Answer
          </IconButton>
          <DialogContentText>
            {answers?.map((c) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    minWidth: "500px",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      border: "beige",
                      boxSizing: "border-box",
                      minWidth: "500px",
                      borderTop: "1px solid #d8deeb",
                      borderBottom: "1px solid #d8deeb",
                      margin: "1rem",
                      borderRadius: "8px",
                      padding: "5px",
                    }}
                  >
                    <Avatar sx={{backgroundColor: "orange"}}>
                      {c.commentedBy}
                    </Avatar>

                    <Typography variant="body1" color="black">
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
          <Button
            onClick={() => {
              setShowComment(false);
            }}
          >
            close
          </Button>
          {/* <Button onClick={handleSubmitComment}>Send</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
