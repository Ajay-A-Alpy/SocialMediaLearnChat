import {Box, styled} from "@mui/system";
import Stack from "@mui/material/Stack";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import {Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpertProfileEdit from "./ExpertProfileEdit";

import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getExpertProfile} from "../../redux/features/authSlice";
import {getCurrentExpertData} from "../../redux/features/expertAuthSlice";

export default function ExpertProfileData() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  useEffect(() => {
    dispatch(getCurrentExpertData);
  });

  return (
    <Box flex={4} sx={{backgroundColor: "white", height: "100%"}}>
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
              height: "",
              width: "90%",
              alignItems: "center",
              paddingTop: {xs: "10%", sm: "25%"},
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img
              onClick={() => {
                setEdit(true);
              }}
              style={{width: "90%"}}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRW8MprfJzvyxKiP8t7o1E-LKC9NkPEVClQ&usqp=CAU"
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
                  primary={expert?.result.about}
                  secondary={expert?.result.name}
                />
              </ListItem>
              <Stack direction="row">
                <ListItem>
                  <ListItemText primary="Followers" secondary="10" />
                </ListItem>

                <ListItem>
                  <ListItemText primary="Followings" secondary="20" />
                </ListItem>

                <ListItem>
                  <ListItemText primary="Friends" secondary="10" />
                </ListItem>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {edit ? (
          <ExpertProfileEdit></ExpertProfileEdit>
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
                    {expert?.result.name}
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
                    {expert?.result.email}
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
                    {expert?.result.mobile}
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
                    {expert?.result?.place}
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
                    {expert?.result?.dob.substring(0, 10)}
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
                    {expert?.result?.hobbies}
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
                    Education
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
                    {expert?.result?.education}
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
                    College
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
                    {expert?.result?.institute}
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
                    Experience
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
                    {expert?.result?.experience}
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
                    Expertise in
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
                    {expert?.result?.subjects}
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
