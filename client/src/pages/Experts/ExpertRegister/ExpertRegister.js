import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import '../ExpertRegister/ExpertRegister.css'
import Typography from "@mui/material/Typography";
import { FormControl, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { expertRegister } from "../../../redux/features/expertAuthSlice";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  password: "",
};

export default function ExpertRegister() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, mobile, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    let letters = /^[a-zA-Z ]*$/;
    if (name == "") {
      setNameError("Name must be filled");
      return false;
    } else {
      setNameError("");
    }

    if (name.length <= 3) {
      setNameError("Name is too short");
      return false;
    } else {
      setNameError("");
    }

    if (!name.match(letters)) {
      setNameError("Name must be Alphabets");
      return false;
    } else {
      setNameError("");
    }

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
    if (mobile == "") {
      setMobileError("Mobile Number must be filled");
      return false;
    } else {
      setMobileError("");
    }
    if (mobile.length != 10) {
      setMobileError("Mobile Number must be 10 digits");
      return false;
    } else {
      setMobileError("");
    }
    if (mobile.match(letters)) {
      setMobileError("Mobile Number must be numerals");
      return false;
    } else {
      setMobileError("");
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

  // useEffect(()=>{
  //     error && toast.error(error);
  // },[error])

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = validate();

    if (error) {
      error && toast.error(error);
    }
    if (password != confirmPassword) {
      return toast.error("Password should match");
    }

    if (isValid) {
      dispatch(expertRegister({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <section className="background">
        <Container className="">
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center", margin: "auto" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{ alignItems: "center", margin: "auto" }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Paper
                  elevation={10}
                  sx={{
                    height: "auto",
                    boxSizing: "border-box",
                    borderRadius: "2rem",
                  }}
                  className="signuporm"
                >
                  <AccountCircleIcon
                    sx={{ fontSize: "4rem", color: "blue" }}
                  ></AccountCircleIcon>
                  <Typography variant="h6" component="h6">
                    EXPERT
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Create Account Now
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ padding: "1rem" }}>
                      <FormControl>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input
                          id="name"
                          value={name}
                          name="name"
                          onChange={onInputChange}
                        />
                      </FormControl>
                    </Box>
                    <span style={{ color: "red" }}>{nameError}</span>

                    <Box sx={{ padding: "1rem" }}>
                      <FormControl>
                        <InputLabel htmlFor="my-input">Email </InputLabel>
                        <Input
                          id="email"
                          value={email}
                          name="email"
                          onChange={onInputChange}
                        />
                      </FormControl>
                    </Box>
                    <span style={{ color: "red" }}>{emailError}</span>

                    <Box sx={{ padding: "1rem" }}>
                      <FormControl>
                        <InputLabel htmlFor="my-input">Mobile</InputLabel>
                        <Input
                          id="mobile"
                          value={mobile}
                          name="mobile"
                          onChange={onInputChange}
                        />
                      </FormControl>
                    </Box>
                    <span style={{ color: "red" }}>{mobileError}</span>

                    <Box sx={{ padding: "1rem" }}>
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
                    <span style={{ color: "red" }}>{passwordError}</span>
                    <Box sx={{ padding: "1rem" }}>
                      <FormControl>
                        <InputLabel htmlFor="my-input">
                          {" "}
                          Confirm password
                        </InputLabel>
                        <Input
                          id="password2"
                          type="password"
                          value={confirmPassword}
                          name="password2"
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      {loading ? (
                        <Button
                          variant="outlined"
                          disabled
                          type="submit"
                          sx={{ backgroundColor: "bisque" }}
                        >
                          Signup
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          type="submit"
                          color="success"
                        >
                          Signup
                        </Button>
                      )}
                    </Box>
                    <Box sx={{ padding: "1rem" }}>
                      <p>
                        Already have an account ?{" "}
                        <Link to="/expert/login"> Login</Link>{" "}
                      </p>
                    </Box>
                  </form>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
