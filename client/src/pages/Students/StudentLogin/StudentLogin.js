import React, {useEffect} from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "../StudentLogin/StudentLog.css";
import Typography from "@mui/material/Typography";
import {FormControl, Input, InputLabel} from "@mui/material";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {login} from "../../../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

export default function StudentLogin() {
  const [formValue, setFormValue] = useState(initialState);
  const {email, password} = formValue;
  const {loading, error} = useSelector((state) => ({...state.auth}));

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      navigate("/student");
    }
  });

  const valid = () => {
    if (email == "") {
      setEmailError("Email must be filled");
      return false;
    } else {
      setEmailError("");
    }
    if (email.indexOf("@") <= 0) {
      setEmailError("Email is invalid");
      return false;
    } else {
      setEmailError("");
    }
    if (
      email.charAt(email.length - 4) != "." &&
      email.charAt(email.length - 3) != "."
    ) {
      setEmailError("Email is invalid");
      return false;
    } else {
      setEmailError("");
    }

    if (password == "") {
      setPasswordError("password  Required");
      return false;
    } else {
      setPasswordError("");
    }

    if (password.length <= 3) {
      setPasswordError("password is too short");
      return false;
    } else {
      setPasswordError("");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = valid();
    if (error) {
      toast.error(error);
    }
    if (isValid) {
      dispatch(login({formValue, navigate, toast}));
    }
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  };

  return (
    <section className="background">
      <Container className="">
        <Grid
          container
          sx={{
            alignItems: "center",
            margin: "auto",
            marginTop: "",
            padding: "1rem",
          }}
          className="login"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{alignItems: "center", margin: "auto", height: "100%"}}
          >
            <Box sx={{textAlign: "center"}}>
              <Paper
                elevation={10}
                sx={{
                  height: "auto",
                  boxSizing: "border-box",
                  borderRadius: "2rem",
                  padding: "2rem",
                }}
                className="form"
              >
                <AccountCircleIcon sx={{fontSize: "4rem"}}></AccountCircleIcon>
                <Typography variant="h6" component="h6">
                  STUDENT
                </Typography>
                <Typography variant="h2" component="h2" className="titleName">
                  LOGIN
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{padding: "1rem"}}>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Email address</InputLabel>
                      <Input
                        id="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </Box>

                  <span style={{color: "red"}}>{emailError}</span>
                  <Box sx={{padding: "1rem"}}>
                    <FormControl>
                      <InputLabel htmlFor="my-input">password</InputLabel>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                      />
                    </FormControl>
                  </Box>
                  <span style={{color: "red"}}>{passwordError}</span>
                  <Box>
                    {loading ? (
                      <Button
                        variant="outlined"
                        disabled
                        type="submit"
                        color="success"
                      >
                        Login
                      </Button>
                    ) : (
                      <Button variant="outlined" type="submit" color="success">
                        Login
                      </Button>
                    )}
                  </Box>
                  <Box sx={{padding: "1rem"}}>
                    <Typography
                      variant="subtitle1"
                      component="h6"
                      color="primary"
                    >
                      Login with google
                    </Typography>
                    <p>
                      create an account ? <Link to="/signup"> signup</Link>{" "}
                    </p>
                  </Box>
                </form>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
