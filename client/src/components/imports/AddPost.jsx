import {Box, Button, Grid, Stack, Typography, styled} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {createArticle} from "../../redux/features/articleSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const initialState = {
  title: "",
  subject: "",
  description: "",
};

export default function AddPost() {
  const [modal, setModal] = useState(false);
  const [articleData, setArticleData] = useState(initialState);
  const {title, subject, description} = articleData;

  const [imageField, setImageField] = useState();

  const {error, loading} = useSelector(state => ({...state.article}));
  const {user} = useSelector(state => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInutChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    setArticleData({...articleData, [name]: value});
  };

  const handleClear = () => {
    setArticleData(initialState);
  };

  const imageHandler = e => {
    setImageField(e.target.files[0]);
  };

  const handlePost = async e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("image", imageField);
    fd.append("title", title);
    fd.append("subject", subject);
    fd.append("description", description);
    fd.append("username", user?.result?.name);
    fd.append("userId", user?.result?._id);

    if (title && subject && description) {
      dispatch(createArticle({fd, navigate, toast}));
      handleClear();
      setModal(false);
    }
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
    <Box flex={2}>
      <Grid container>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            component="span"
            sx={{backgroundColor: "#ffa8B6"}}
            endIcon={<AddBoxIcon />}
            onClick={() => setModal(true)}
          >
            Add Article
          </Button>
          <Button
            variant="contained"
            component="span"
            endIcon={<AddBoxIcon />}
            sx={{backgroundColor: "#a28089"}}
          >
            Add Question
          </Button>
        </Stack>
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
                Create an Article
              </Typography>

              <UserBox>
                <Stack direction="column" sx={{width: "100%"}} gap={2}>
                  <TextField
                    placeholder="Title"
                    variant="standard"
                    name="title"
                    value={title}
                    onChange={onInutChange}
                    sx={{padding: "", width: "100%"}}
                  />
                  <TextField
                    placeholder="Subject"
                    variant="standard"
                    name="subject"
                    value={subject}
                    onChange={onInutChange}
                    sx={{padding: "", width: "100%"}}
                  />
                  <TextField
                    placeholder="Description"
                    variant="standard"
                    name="description"
                    value={description}
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
                  Post
                </Button>
              </Stack>
            </Box>
          </ModalStyled>
        </Box>
      </Grid>
    </Box>
  );
}
