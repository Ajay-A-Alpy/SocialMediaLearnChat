import React from "react";
import {Box, Button, styled} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllArticles} from "../../redux/features/adminSlice";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {Checkbox, Tooltip, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import GppGoodIcon from "@mui/icons-material/GppGood";
import CircularProgress from "@mui/material/CircularProgress";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {deleteArticle} from "../../redux/features/articleSlice";
import {toast} from "react-toastify";

function AllArticleList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [article, setArticle] = useState([]);
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    dispatch(getAllArticles(navigate));
  }, [showDelete]);

  const ModalStyled = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  });

  const handleViewPost = (article) => {
    console.log("hello view post");
    console.log(article);
    setArticle(article);

    setModal(true);
  };

  const handleDelete = () => {
    let id = article._id;
    setShowDelete(false);
    dispatch(deleteArticle({id}));
    toast.success("Article deleted");
  };

  const handleRemove = (item) => {
    setArticle(item);
    setShowDelete(true);
  };

  const {allArticles} = useSelector((state) => ({...state.admin}));

  return (
    <>
      <Box
        flex={4}
        sx={{backgroundColor: "#0071c5", height: "85vh", padding: "2rem"}}
      >
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl no</TableCell>
                <TableCell align="left">Article Name</TableCell>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="left">Creator</TableCell>
                <TableCell align="left">Date of Article</TableCell>
                <TableCell align="left">Options</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allArticles.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.subject}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">
                    {row.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      sx={{backgroundColor: "green"}}
                      onClick={handleViewPost.bind(this, row)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      sx={{backgroundColor: "red"}}
                      onClick={handleRemove.bind(this, row)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ModalStyled
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: {xs: "90%", sm: "40%"},
            height: {xs: "90%", sm: "80%"},
            backgroundColor: "white",
            borderRadius: "",
            padding: "auto",
          }}
        >
          <Card sx={{margin: 5, maxHeight: "30rem", overflowY: "scroll"}}>
            <CardHeader
              avatar={
                <Box>
                  <Avatar
                    sx={{bgcolor: "red"}}
                    aria-label="recipe"
                    src={"http://localhost:5000/profile.jpg"}
                  ></Avatar>
                </Box>
              }
              action={<IconButton aria-label="settings"></IconButton>}
              title={article.username}
              subheader={article.createdAt?.substring(0, 10)}
            />
            {article.images ? (
              <CardMedia
                component="img"
                height="10%"
                width="20%"
                src={require(`../../../../server/uploads/${article.images}`)}
                alt="Paella dish"
              />
            ) : (
              ""
            )}
            <CardContent>
              <Typography>{"Sub: " + article.subject}</Typography>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="text.primary">
                {article.description}
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
            <CardActions
              sx={{display: "flex", justifyContent: "space-between"}}
            >
              {
                <IconButton aria-label="unlike">
                  <Tooltip title="" placement="left" sx={{marginLeft: "1rem"}}>
                    <Favorite />
                  </Tooltip>
                  {article.likes?.length}
                </IconButton>
              }

              <IconButton aria-label="verify" sx={{cursor: "default"}}>
                <Tooltip
                  title="verification by experts"
                  placement="left"
                  sx={{marginLeft: "1rem"}}
                >
                  <GppGoodIcon></GppGoodIcon>
                </Tooltip>
                {article.verifiedCount?.length}
              </IconButton>

              <IconButton aria-label="comment">
                <Tooltip
                  title="comment"
                  placement="left"
                  sx={{marginLeft: "1rem"}}
                >
                  <CommentIcon />
                </Tooltip>
                {article.comments?.length}
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </ModalStyled>

      <Dialog
        open={showDelete}
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
          <Button onClick={() => setShowDelete(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllArticleList;
