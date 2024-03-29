import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateProfile} from "../../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function ProfileEdit(props) {
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initials = {
    name: user.result.name,
    email: user.result.email,
    mobile: user.result.mobile,
    place: user.result?.place,
    dob: user.result?.dob,
    classNum: user.result?.classNum,
    school: user.result?.school,
    subjects: user.result?.subjects,
    hobbies: user.result?.hobbies,
  };

  const [profileData, setProfileData] = useState(initials);
  const {name, email, mobile, place, dob, classNum, school, subjects, hobbies} =
    profileData;

  const onInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setProfileData({...profileData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let Id = user.result._id;

    if (name && email && mobile) {
      dispatch(updateProfile({profileData, Id, toast, navigate}));
      props.setEdit(false);
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
            Personal Info
          </Typography>{" "}
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
        {/* <label>DOB {dob ? ":" + dob.substring(0, 10) : ""}</label> */}

        <input
          style={{
            width: "13rem",
            height: "3.5rem",
            borderColor: "white",
            border: "1px solid gray",
            borderRadius: "5px",
            backgroundColor: "",
          }}
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
          value={classNum}
          name="classNum"
          onChange={onInputChange}
          placeholder="Class"
        />

        <TextField
          id="outlined-required"
          value={school}
          name="school"
          onChange={onInputChange}
          placeholder="School/College"
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
