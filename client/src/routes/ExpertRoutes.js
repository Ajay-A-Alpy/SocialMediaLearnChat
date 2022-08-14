import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import ExpertArticles from "../pages/Experts/ExpertArticles/ExpertArticles";
import ExpertHome from "../pages/Experts/ExpertHome/ExpertHome";
import ExpertLogin from "../pages/Experts/ExpertLogin/ExpertLogin";
import ExpertProfile from "../pages/Experts/ExpertProfile/ExpertProfile";
import ExpertQuestionView from "../pages/Experts/ExpertQuestion/ExpertQuestionView";
import ExpertRegister from "../pages/Experts/ExpertRegister/ExpertRegister";
import ExpertStudents from "../pages/Experts/ExpertStudents/ExpertStudents";

export default function ExpertRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/expert/signup"
          element={<ExpertRegister></ExpertRegister>}
        ></Route>

        <Route
          path="/expert/articles"
          element={<ExpertArticles></ExpertArticles>}
        ></Route>
        <Route
          path="/expert/students"
          element={<ExpertStudents></ExpertStudents>}
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
        <Route
          path="/expert/questions"
          element={<ExpertQuestionView></ExpertQuestionView>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
