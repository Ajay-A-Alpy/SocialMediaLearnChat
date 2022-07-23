import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {expertUpdateProfile} from "../../redux/features/expertAuthSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function ExpertProfileEdit() {
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initials = {
    name: expert.result.name,
    email: expert.result.email,
    mobile: expert.result.mobile,
    place: expert.result?.place,
    dob: expert.result?.dob,
    education: expert.result?.education,
    institute: expert.result?.institute,
    subjects: expert.result?.subjects,
    hobbies: expert.result?.hobbies,
    experience: expert.result?.experience,
    about: expert.result?.about,
  };

  const [profileData, setProfileData] = useState(initials);
  const {
    name,
    email,
    mobile,
    place,
    dob,
    education,
    institute,
    subjects,
    hobbies,
    experience,
    about,
  } = profileData;

  const onInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setProfileData({...profileData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let Id = expert.result._id;

    if (name && email && mobile) {
      console.log("expert 00000000000");
      dispatch(expertUpdateProfile({profileData, Id, toast, navigate}));
    }
  };

  return (
    <Box flex={4} sx={{backgroundColor: "#F8F8FF"}}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          height: "auto",
          width: "80%",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
        <Typography variant="h5" component="h5">
          EDIT PROFILE
        </Typography>
        <Box bgcolor="powderblue" sx={{width: "100%", textAlign: "center"}}>
          <Typography variant="h6" component="h6">
            Expert Personal Info
          </Typography>
        </Box>
        <TextField
          value={name}
          name="name"
          onChange={onInputChange}
          id="outlined-required"
          placeholder="Name"
          label=""
        />

        <TextField
          id="outlined-required"
          value={email}
          name="email"
          onChange={onInputChange}
          placeholder="Emaiplaceholder"
        />

        <TextField
          value={mobile}
          name="mobile"
          onChange={onInputChange}
          placeholder="Mobile"
        />

        <TextField
          id="outlined-required"
          value={place}
          name="place"
          onChange={onInputChange}
          placeholder="Place"
        />
        {/* <label>DOB {":" + dob.substring(0, 10)}</label> */}
        <input
          style={{width: "13rem", height: "3rem", borderColor: "white"}}
          type="date"
          placeholder="DOB"
          name="dob"
          onChange={onInputChange}
          value={dob}
        ></input>
        <Box bgcolor="powderblue" sx={{width: "100%", textAlign: "center"}}>
          <Typography variant="h6" component="h6">
            Educational Info
          </Typography>{" "}
        </Box>

        <TextField
          id="outlined-required"
          value={experience}
          name="experience"
          onChange={onInputChange}
          placeholder="Experience if any"
        />

        <TextField
          id="outlined-required"
          value={education}
          name="education"
          onChange={onInputChange}
          placeholder="Education"
        />

        <TextField
          id="outlined-required"
          value={institute}
          name="institute"
          onChange={onInputChange}
          placeholder="College"
        />

        <TextField
          id="outlined-required"
          value={subjects}
          name="subjects"
          onChange={onInputChange}
          placeholder="Interested Subject"
        />

        <TextField
          id="outlined-required"
          value={hobbies}
          name="hobbies"
          onChange={onInputChange}
          placeholder="Hobbies"
        />

        <TextField
          id="outlined-required"
          value={about}
          name="about"
          onChange={onInputChange}
          placeholder="About you"
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
