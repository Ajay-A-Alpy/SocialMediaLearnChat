import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useState, useEffect} from "react";
import {useNavigate, Navigate} from "react-router-dom";
function LoadingRoute() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/student/login");
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <Box>
      <Typography variant="h3">Redirecting you in {count} seconds</Typography>
    </Box>
  );
}

export default LoadingRoute;
