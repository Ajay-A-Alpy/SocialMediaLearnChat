import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminHome from "../pages/Admin/AdminHome/AdminHome";
import AdminLogin from "../pages/Admin/adminLogin/AdminLogin";
import AllArticles from "../pages/Admin/AllArticles/AllArticles";
import AllExperts from "../pages/Admin/AllExperts/AllExperts";
import AllStudents from "../pages/Admin/AllStudents/AllStudents";
import ErrorPage from "../pages/Error/ErrorPage";

export default function AdminRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/admin" element={<AdminHome></AdminHome>}></Route>
        <Route
          path="/admin/students"
          element={<AllStudents></AllStudents>}
        ></Route>
        <Route
          path="/admin/articles"
          element={<AllArticles></AllArticles>}
        ></Route>
        <Route
          path="/admin/experts"
          element={<AllExperts></AllExperts>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
