import React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";

function StudentAuthRouter() {
  const [Isuser, setIsUser] = useState(false);
  const {user} = useSelector((state) => ({...state.auth}));
  useEffect(() => {
    console.log("hello studentsss");
    console.log(user.result);
    if (user?.result) {
      setIsUser(true);
    }
  }, []);
  return Isuser ? <Outlet></Outlet> : <Navigate to="/student/login"></Navigate>;
}

export default StudentAuthRouter;
