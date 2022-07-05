import { Box, Button, Grid, Stack, Typography, styled } from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";
import { useState,} from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../redux/features/articleSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormControl, Input, InputLabel } from "@mui/material";

const initialState = {
  title: "",
  subject: "",
  description: "",
};

export default function AddPost() {
  
      const [modal, setModal] = useState(false);
  const [articleData, setArticleData] = useState(initialState);
  const { title, subject, description } = articleData;



  const { error, loading } = useSelector((state) => ({ ...state.article }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInutChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };



  const handleClear=()=>{
    setArticleData(initialState);

  }

  const handlePost = (e) => {
    e.preventDefault();
    if (title && subject && description) {
      const updatedArticleData = {
        ...articleData,
        username: user?.result?.name,
      };
      dispatch(createArticle({ updatedArticleData, navigate, toast }));
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
            sx={{ backgroundColor:"#ffa8B6" }}
            endIcon={<AddBoxIcon />}
            onClick={() => setModal(true)}
          >
            Add Article
          </Button>
          <Button
            variant="contained"
            component="span"
            endIcon={<AddBoxIcon />}
            sx={{ backgroundColor:"#a28089" }}
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
                width: { xs: "90%", sm: "40%" },
                height: { xs: "90%", sm: "80%" },
                backgroundColor: "white",
                borderRadius: "",
                padding: "auto",
              }}
            >


              <Typography
                sx={{ padding: "3rem" }}
                fontWeight={400}
                color="gray"
                textAlign="center"
              >
                Create an Article
              </Typography>

              <UserBox>
             
                <Stack direction="column" sx={{ width: "100%" }} gap={2}>
                <form >
                  <TextField
                    placeholder="Title"
                    variant="standard"
                    name="title"
                    defaultValue={title}
                     onChange={onInutChange}
                    sx={{ padding: "", width: "100%" }}
                  />
                  <TextField
                    placeholder="Subject"
                    variant="standard"
                    name="subject"
                  
                    //  value={subject}
                    //  onChange={onInutChange}
                    sx={{ padding: "", width: "100%" }}
                  />
                  <TextField
                    placeholder="Description"
                    variant="standard"
                    name="description"
                 
                    //  value={description}
                    //  onChange={onInutChange}
                    multiline
                    rows={4}
                    sx={{ padding: "", width: "100%" }}
                  />
                      </form>
                </Stack>
            
              </UserBox>
              <Stack
                direction="row"
                sx={{ position: "relative" }}
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
                  />
                  <Button
                    variant="contained"
                    component="span"
                    endIcon={<AddPhotoAlternateIcon></AddPhotoAlternateIcon>}
                    sx={{ fontSize: "1rem", marginInline: "2rem" }}
                  >
                    Upload
                  </Button>
                </label>
              </Stack>

              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                // onClick={handlePost}
                sx={{ width: "50%", marginInline: "20%" }}
              >
                Post
              </Button>
           
            </Box>
          </ModalStyled>
        </Box>
      </Grid>
    </Box>
  );
}
