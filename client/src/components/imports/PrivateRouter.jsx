import React from "react";
import {useSelector} from "react-redux";
import LoadingRoute from "./LoadingRoute";

function PrivateRouter({children}) {
  const {user} = useSelector((state) => ({...state.auth}));
  return user ? children : <LoadingRoute></LoadingRoute>;
}

export default PrivateRouter;
