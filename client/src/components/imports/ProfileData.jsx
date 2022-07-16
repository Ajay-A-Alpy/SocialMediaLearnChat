import {Box, styled} from "@mui/system";
import Stack from "@mui/material/Stack";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import {Button, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEdit from "./ProfileEdit";

import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {updateProfilePic} from "../../redux/features/authSlice";

export default function ProfileData() {
  const [edit, setEdit] = useState(false);
  const {user} = useSelector((state) => ({...state.auth}));
  const [imageField, setImageField] = useState();
  const dispatch = useDispatch();

  const Input = styled("input")({
    display: "none",
  });

  const imageHandler = (e) => {
    setImageField(e.target.files[0]);
    const fd = new FormData();
    fd.append("image", imageField);
    fd.append("userId", user?.result._id);
    console.log("hello upload pic");

    dispatch(updateProfilePic(fd));
  };

  return (
    <Box flex={4} sx={{backgroundColor: "white", minHeight: "100vh"}}>
      <Stack direction={{xs: "column", sm: "row"}} spacing={4}>
        <Box
          flex={2}
          sx={{
            backgroundColor: "white",
            height: "100%",
            display: {xs: "block", sm: "block"},
          }}
        >
          <Box sx={{dispaly: "block", textAlign: "end"}}>
            <Tooltip title="Edit Profile" placement="left">
              <EditIcon
                color="white"
                onClick={() => {
                  setEdit(!edit);
                }}
              ></EditIcon>
            </Tooltip>
          </Box>

          <Box
            sx={{
              width: "90%",
              alignItems: "center",
              paddingTop: {xs: "10%", sm: "15%"},
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                boxSizing: "border-box",
                width: "70%",
                height: "70%",
              }}
            >
              <img
                style={{width: "80%", maxHeight: "300px"}}
                src={
                  user?.result.profilePic
                    ? "http://localhost:5000/" + user?.result.profilePic
                    : "http://localhost:5000/profile.jpg"
                }
              />
            </Box>
            <Box sx={{}}>
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
                  component="span"
                  endIcon={<AddPhotoAlternateIcon></AddPhotoAlternateIcon>}
                >
                  Edit
                </Button>
              </label>
            </Box>
          </Box>
          <Box
            sx={{
              height: "50%",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Stack
              direction="column"
              sx={{marginTop: "2rem", textAlign: "start", position: "relative"}}
            >
              <ListItem>
                <ListItemText
                  primary="Followers"
                  secondary={user?.result?.followers.length}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Followings"
                  secondary={user?.result?.following.length}
                />
              </ListItem>

              <ListItem>
                <ListItemText primary="Friends" secondary="" />
              </ListItem>
            </Stack>
          </Box>
        </Box>

        {edit ? (
          <ProfileEdit setEdit></ProfileEdit>
        ) : (
          <Box flex={4} sx={{backgroundColor: "", height: "100%"}}>
            <Box
              sx={{backgroundColor: "", height: "auto", textAlign: "center"}}
            >
              <Typography
                component="h5"
                variant="h5"
                color="white"
                sx={{width: "100%", backgroundColor: "#34568B"}}
              >
                Personal Info
              </Typography>

              <Stack direction="column">
                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Name
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result.name}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Email
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result.email}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Mobile
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result.mobile}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Place
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result?.place}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    DOB
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result?.dob ? user.result?.dob.substring(0, 10) : ""}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Hobbies
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result?.hobbies ? user.result?.hobbies : ""}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                height: "50%",
                textAlign: "center",
                padding: "1rem",
              }}
            >
              <Typography
                component="h5"
                variant="h5"
                color="white"
                sx={{width: "100%", backgroundColor: "#34568B"}}
              >
                Educational Info
              </Typography>

              <Stack direction="column">
                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Class
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result.classNum ? user.result.classNum : ""}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    School/college
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result?.school ? user.result?.school : ""}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "40%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    Interested Topics
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight={300}
                    sx={{
                      width: "60%",
                      backgroundColor: "",
                      textAlign: "start",
                      padding: "1rem 0 0 2rem",
                    }}
                  >
                    {user?.result?.subjects ? user.result?.subjects : ""}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
