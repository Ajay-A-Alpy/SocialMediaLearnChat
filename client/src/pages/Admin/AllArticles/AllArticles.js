import React from "react";
import {Box} from "@mui/system";
import AdminNavbar from "../../../components/imports/AdminNavbar";
import AdminSidebar from "../../../components/imports/AdminSidebar";

import AdminRightbar from "../../../components/imports/AdminRightbar";
import Stack from "@mui/material/Stack";
import AllArticleList from "../../../components/imports/AllArticleList";
function AllArticles() {
  return (
    <Box bgcolor={"#393f4d"} color={"text.primary"}>
      <AdminNavbar></AdminNavbar>
      <Stack direction="row" justifyContent="space-between">
        <AdminSidebar></AdminSidebar>
        <AllArticleList></AllArticleList>
        <AdminRightbar></AdminRightbar>
      </Stack>
    </Box>
  );
}

export default AllArticles;
