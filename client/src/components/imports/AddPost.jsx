import {Box, Button, Grid, Stack, Typography, styled} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";
import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {createArticle, getArticles} from "../../redux/features/articleSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [imageField, setImageField] = useState();

  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      dispatch(getArticles());
    }
    return () => {
      unsubscribed = true;
    };
  }, [change]);

  const handleClear = () => {
    setTitle("");
    setSubject("");
    setDescription("");
  };

  const imageHandler = (e) => {
    setImageField(e.target.files[0]);
  };

  const handlePost = async (e) => {
    const fd = new FormData();
    fd.append("image", imageField);
    fd.append("title", title);
    fd.append("subject", subject);
    fd.append("description", description);
    fd.append("username", user?.result?.name);
    fd.append("userId", user?.result?._id);

    if (title && subject && description) {
      setOpen(false);

      dispatch(createArticle({fd, navigate, toast}));
      setChange(!change);
      handleClear();
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Box flex={2}>
      <Grid container fullWidth>
        <Stack spacing={2} sx={{width: "100%"}}>
          <Button
            variant="contained"
            component="span"
            sx={{
              backgroundColor: "#F1F1F1",
              color: "black",
              width: "100%",
              boxShadow: "1px 2px 5px #764AF1",
            }}
            endIcon={<AddBoxIcon />}
            onClick={() => setOpen(true)}
          >
            Add Article
          </Button>
        </Stack>
      </Grid>

      <Dialog open={open}>
        <DialogTitle sx={{width: "100%", textAlign: "center"}}>
          New Article
        </DialogTitle>
        <DialogContent>
          <Box className="Article_form">
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              label="Subject"
              name="subject"
              value={subject}
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
              name="description"
              value={description}
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
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
