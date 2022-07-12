import { Box, Button } from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { followOne ,unFollowOne} from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";



function ViewStudent() {
  const { profile } = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFollow = () => {
    let Id = user.result._id;
    console.log("hhhhhhhh");

    let userData = {
      followId: profile.user._id,
    };
    dispatch(followOne({ userData, Id, navigate }));
  };

  
  const handleUnfollow = () => {
    let Id = user.result._id;
    console.log("unfollow");

    let userData = {
      followId: profile.user._id,
    };
    dispatch(unFollowOne({ userData, Id, navigate }));
  };

  return (
    <Box flex={4}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
        <Box
          flex={2}
          sx={{
            backgroundColor: "white",
            height: "100%",
            display: { xs: "block", sm: "block" },
          }}
        >
          <Box
            sx={{
              height: "",
              width: "90%",
              alignItems: "center",
              paddingTop: { xs: "10%", sm: "25%" },
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img
              style={{ width: "90%" }}  alt="profile pic"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRW8MprfJzvyxKiP8t7o1E-LKC9NkPEVClQ&usqp=CAU"
            />
          </Box>
          <Box sx={{
              height: "50%",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex"}}>

            {profile.user.followers.includes(user.result._id) ? 
              <ListItem>
                <Button onClick={handleUnfollow}>Unfollow</Button>
                
              </ListItem>
             : 
              <ListItem>
                <Button onClick={handleFollow}>Follow</Button>
              </ListItem>
            }

            <Stack
              direction="column"
              sx={{
                marginTop: "2rem",
                textAlign: "start",
                position: "relative",
              }}
            >
              <ListItem>
                <ListItemText
                  primary="Followers"
                  secondary={
                    profile.user.followers ? profile.user.followers.length : 0
                  }
                />
              </ListItem>

              <ListItem>
                {
                  <ListItemText
                    primary="Followings"
                    secondary={
                      profile.user.following ? profile.user.following.length : 0
                    }
                  />
                }
              </ListItem>

              <ListItem>
                <ListItemText primary="Friends" secondary="10" />
              </ListItem>
            </Stack>
          </Box>
        </Box>

        <Box flex={4} sx={{ backgroundColor: "", height: "100%" }}>
          <Box
            sx={{ backgroundColor: "", height: "auto", textAlign: "center" }}
          >
            <Typography
              component="h5"
              variant="h5"
              color="white"
              sx={{ width: "100%", backgroundColor: "#34568B" }}
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
                  {profile.user.name}
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
                  {profile.user.email}
                </Typography>
              </Stack>
              {/* 
                        <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                       Mobile
                        </Typography>

                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {profile.user.mobile}
                        </Typography>
                        </Stack> */}

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
                  {profile.user?.place}
                </Typography>
              </Stack>

              {/* <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                   DOB 
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {profile.user?.dob ? profile.user?.dob.substring(0,10): "" }
                        </Typography>
                        </Stack> */}

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
                  {profile.user?.hobbies}
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
              sx={{ width: "100%", backgroundColor: "#34568B" }}
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
                  {profile.user.classNum}
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
                  {profile.user?.school}
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
                  {profile.user?.subjects}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ViewStudent;
