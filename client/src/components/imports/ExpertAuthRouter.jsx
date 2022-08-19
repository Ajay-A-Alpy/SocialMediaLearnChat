import React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";

function PrivateRouter() {
  const [Isuser, setIsUser] = useState(false);
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  useEffect(() => {
    let token = localStorage.getItem("expertToken");
    if (expert) {
      setIsUser(true);
    }
  }, [expert]);
  return Isuser ? <Outlet></Outlet> : <Navigate to="/expert/login"></Navigate>;
}

export default PrivateRouter;
