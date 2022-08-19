import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import PrivateRouter from "../components/imports/ExpertAuthRouter";

import ProfileEdit from "../components/imports/ProfileEdit";
import Home from "../pages/common/Home";
import ExpertMessenger from "../pages/messenger/ExpertMessenger";
import Messenger from "../pages/messenger/Messenger";
import MyArticles from "../pages/Students/Articles/MyArticles";
import Experts from "../pages/Students/Experts/Experts";
import MyFollowers from "../pages/Students/Followers/MyFollowers";
import MyFollowings from "../pages/Students/followings/MyFollowings";
import Myfriends from "../pages/Students/friends/Myfriends";
import MyQuestions from "../pages/Students/MyQuestions/MyQuestions";
import StudentHome from "../pages/Students/StudentHome/StudentHome";
import StudentLogin from "../pages/Students/StudentLogin/StudentLogin";
import StudentProfile from "../pages/Students/StudentProfile/StudentProfile";
import StudentRegister from "../pages/Students/StudentRegister/StudentRegister";
import ViewExpert from "../pages/Students/ViewExpert/ViewExpert";
import ViewStudents from "../pages/Students/ViewStudent/ViewStudents";
import VideoChat from "../pages/VideoChat/VideoChat";

export default function StudentRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/login" element={<StudentLogin />}></Route>
        <Route
          path="/student/signup"
          element={<StudentRegister></StudentRegister>}
        ></Route>

        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/student" element={<StudentHome />}></Route>

        <Route path="/student/profile" element={<StudentProfile />}></Route>
        <Route path="/editProfie" element={<ProfileEdit />}></Route>
        <Route path="/student/articles" element={<MyArticles />}></Route>
        <Route
          path="/student/questions"
          element={<MyQuestions></MyQuestions>}
        ></Route>
        <Route path="/student/followers" element={<MyFollowers />}></Route>
        <Route path="/student/followings" element={<MyFollowings />}></Route>
        <Route path="/student/friends" element={<Myfriends />}></Route>
        <Route path="/student/experts" element={<Experts></Experts>}></Route>
        <Route path="/student/viewProfile" element={<ViewStudents />}></Route>
        <Route
          path="/student/viewExpertProfile"
          element={<ViewExpert></ViewExpert>}
        ></Route>
        <Route path="/messenger" element={<Messenger></Messenger>}></Route>
        <Route
          path="/Expertmessenger"
          element={<ExpertMessenger></ExpertMessenger>}
        ></Route>
        <Route path="/videocall" element={<VideoChat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
