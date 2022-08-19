import React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";

function PrivateRouter() {
  const [user, setUser] = useState({});
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  useEffect(() => {
    console.log(expert.result);
    setUser(expert.result);
  }, []);
  return user ? <Outlet></Outlet> : <Navigate to="/expert/login"></Navigate>;
}

export default PrivateRouter;
