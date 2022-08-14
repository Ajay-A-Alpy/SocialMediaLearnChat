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
import Messenger from "./pages/messenger/Messenger";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCurrentUser, setUser} from "./redux/features/authSlice";
import ProfileEdit from "./components/imports/ProfileEdit";
import Home from "./pages/common/Home";
import ExpertRegister from "./pages/Experts/ExpertRegister/ExpertRegister";
import ExpertLogin from "./pages/Experts/ExpertLogin/ExpertLogin";
import ExpertHome from "./pages/Experts/ExpertHome/ExpertHome";
import ExpertProfile from "./pages/Experts/ExpertProfile/ExpertProfile";
import MyFollowers from "./pages/Students/Followers/MyFollowers";
import ViewStudents from "./pages/Students/ViewStudent/ViewStudents";
import MyFollowings from "./pages/Students/followings/MyFollowings";
import {
  getCurrentExpertData,
  setExpert,
} from "./redux/features/expertAuthSlice";
import Myfriends from "./pages/Students/friends/Myfriends";
import PrivateRouter from "./components/imports/PrivateRouter";
import VideoChat from "./pages/VideoChat/VideoChat";
import {ContextProvider} from "./components/videoPlayer/SocketContext";
import AdminLogin from "./pages/Admin/adminLogin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import AllStudents from "./pages/Admin/AllStudents/AllStudents";
import AllExperts from "./pages/Admin/AllExperts/AllExperts";
import AllArticles from "./pages/Admin/AllArticles/AllArticles";
import Experts from "./pages/Students/Experts/Experts";
import ViewExpert from "./pages/Students/ViewExpert/ViewExpert";
import ExpertMessenger from "./pages/messenger/ExpertMessenger";
import {useSelector} from "react-redux";
import MyQuestions from "./pages/Students/MyQuestions/MyQuestions";
import ExpertQuestionView from "./pages/Experts/ExpertQuestion/ExpertQuestionView";
import ExpertArticles from "./pages/Experts/ExpertArticles/ExpertArticles";
import ExpertStudents from "./pages/Experts/ExpertStudents/ExpertStudents";
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
