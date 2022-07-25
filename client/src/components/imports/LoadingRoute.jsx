import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, Navigate} from "react-router-dom";
import {getCurrentUser} from "../../redux/features/authSlice";
function LoadingRoute() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate;
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && handleNavigate();

    const handleNavigate = () => {
      if (localStorage.getItem("userToken")) {
        dispatch(getCurrentUser());
        window.location.reload();
      } else {
        navigate("/");
        window.location.reload();
      }
    };
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
      }}
    >
      <Typography variant="h3">Redirecting you in {count} seconds</Typography>
    </Box>
  );
}

export default LoadingRoute;
