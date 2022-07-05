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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentHome></StudentHome>}></Route>

        <Route path="/login" element={<StudentLogin />}></Route>
        <Route
          path="/signup"
          element={<StudentRegister></StudentRegister>}
        ></Route>
        <Route
          path="/profile"
          element={<StudentProfile></StudentProfile>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
