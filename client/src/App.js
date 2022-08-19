import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCurrentUser, setUser} from "./redux/features/authSlice";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {
  getCurrentExpertData,
  setExpert,
} from "./redux/features/expertAuthSlice";

import ExpertRoutes from "./routes/ExpertRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/common/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userValid = JSON.parse(localStorage.getItem("userToken"));

    const expertValid = JSON.parse(localStorage.getItem("expertToken"));
    console.log("hello user is dispatched");
    console.log(userValid);
    if (userValid) {
      dispatch(getCurrentUser());
    }

    if (expertValid) {
      dispatch(getCurrentExpertData());
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
      <StudentRoutes></StudentRoutes>
      <ExpertRoutes></ExpertRoutes>
      <AdminRoutes></AdminRoutes>
      {/* <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
