import {Box, Button} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {
  followExpert,
  getExpertProfile,
  unfollowExpert,
  unFollowOne,
} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function ViewExpertProfile({Id}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const {expert} = useSelector((state) => ({...state.auth}));
  const {user} = useSelector((state) => ({...state.auth}));

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      let userId = expert._id;
      dispatch(getExpertProfile({userId, navigate}));
    }
    return () => {
      unsubscribed = true;
    };
  }, [change]);

  const handleFollow = () => {
    let Id = user.result._id;
    console.log("hhhhhhhh");

    let userData = {
      followId: expert._id,
    };
    dispatch(followExpert({userData, Id, navigate}));
    setChange(!change);
  };

  const handleUnfollow = () => {
    let Id = user.result._id;
    console.log("unfollow");

    let userData = {
      followId: expert._id,
    };
    dispatch(unfollowExpert({userData, Id, navigate}));
    setChange(!change);
  };

  return (
    <Box flex={4} sx={{minHeight: "100vh"}}>
      <Stack direction={{xs: "column", sm: "row"}} spacing={4}>
        <Box
          flex={2}
          sx={{
            backgroundColor: "white",
            height: "100%",
            display: {xs: "block", sm: "block"},
          }}
        >
          <Box
            sx={{
              height: "",
              width: "90%",
              alignItems: "center",
              paddingTop: {xs: "10%", sm: "25%"},
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img
              style={{width: "90%"}}
              alt="profile pic"
              src={
                expert?.profilePic
                  ? "http://localhost:5000/" + expert?.profilePic
                  : "http://localhost:5000/profile.jpg"
              }
            />
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
            {expert?.students.includes(user?.result._id) ? (
              <ListItem>
                <Button variant="outlined" onClick={handleUnfollow}>
                  Unfollow
                </Button>
              </ListItem>
            ) : (
              <ListItem>
                <Button variant="outlined" onClick={handleFollow}>
                  Follow
                </Button>
              </ListItem>
            )}

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
                  secondary={expert.students ? expert?.students?.length : 0}
                  sx={{color: "black"}}
                />
              </ListItem>

              {/* <ListItem>
                {
                  <ListItemText
                    primary="Followings"
                    secondary={expert?.following ? expert?.following.length : 0}
                  />
                }
              </ListItem> */}

              {/* <ListItem>
                <ListItemText
                  primary="Friends"
                  secondary={expert?.friends ? expert.friends.length : 0}
                />
              </ListItem> */}
            </Stack>
          </Box>
        </Box>

        <Box flex={4} sx={{backgroundColor: "", height: "100vh"}}>
          <Box sx={{backgroundColor: "", height: "auto", textAlign: "center"}}>
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
                  {expert?.name}
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
                  {expert.email}
                </Typography>
              </Stack>

              {/* <Stack direction="row">
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
                  {expert.mobile}
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
                  {expert?.place}
                </Typography>
              </Stack>

              {/* <Stack direction="row">
                       <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"40%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                   DOB 
                        </Typography>
                        <Typography component="h6" variant="h6" fontWeight={300} sx={{width:"60%", backgroundColor:"", textAlign:"start",padding:"1rem 0 0 2rem"}}>
                        {expert?.dob ? expert?.dob.substring(0,10): "" }
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
                  {/* {expert?.hobbies} */}
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
                ></Typography>
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
                  {expert?.institute}
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
                  {/* {expert?.subjects} */}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ViewExpertProfile;
