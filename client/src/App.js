import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCurrentUser, setUser} from "./redux/features/authSlice";

import {
  getCurrentExpertData,
  setExpert,
} from "./redux/features/expertAuthSlice";

import ExpertRoutes from "./routes/ExpertRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ErrorPage from "./pages/Error/ErrorPage";

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
