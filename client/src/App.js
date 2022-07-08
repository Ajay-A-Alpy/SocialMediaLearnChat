import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import StudentLogin from "./pages/Students/StudentLogin/StudentLogin";
import StudentHome from "./pages/Students/StudentHome/StudentHome";
import StudentRegister from "./pages/Students/StudentRegister/StudentRegister";
import StudentProfile from "./pages/Students/StudentProfile/StudentProfile";
import MyArticles from "./pages/Students/Articles/MyArticles";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import ProfileEdit from "./components/imports/ProfileEdit";
import Home from "./pages/common/Home";
import ExpertRegister from "./pages/Experts/ExpertRegister/ExpertRegister";
import ExpertLogin from "./pages/Experts/ExpertLogin/ExpertLogin";
import ExpertHome from "./pages/Experts/ExpertHome/ExpertHome";
import ExpertProfile from "./pages/Experts/ExpertProfile/ExpertProfile";
import MyFollowers from "./pages/Students/Followers/MyFollowers";

function App() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<StudentHome></StudentHome>}></Route>

        <Route path="/student/login" element={<StudentLogin />}></Route>
        <Route
          path="/student/signup"
          element={<StudentRegister></StudentRegister>}
        ></Route>
        <Route
          path="/student/profile"
          element={<StudentProfile></StudentProfile>}
        ></Route>

        <Route path="/editProfie" element={<ProfileEdit></ProfileEdit>}></Route>

        <Route
          path="/student/articles"
          element={<MyArticles></MyArticles>}
        ></Route>

        <Route
          path="/student/followers"
          element={<MyFollowers></MyFollowers>}
        ></Route>

        <Route
          path="/expert/articles"
          element={<MyArticles></MyArticles>}
        ></Route>

        <Route path="/" element={<Home></Home>}></Route>

        <Route
          path="/expert/signup"
          element={<ExpertRegister></ExpertRegister>}
        ></Route>
        <Route
          path="/expert/login"
          element={<ExpertLogin></ExpertLogin>}
        ></Route>
        <Route path="/expert" element={<ExpertHome></ExpertHome>}></Route>
        <Route
          path="/expert/profile"
          element={<ExpertProfile></ExpertProfile>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
