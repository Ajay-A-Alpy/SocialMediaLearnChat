import { Box } from "@mui/material";
import Sidebar from "../../../components/imports/Sidebar";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/imports/Navbar";
import ArticleList from "../../../components/imports/ArticleList";

import { useState } from "react";
import Rightbar from "../../../components/imports/Rightbar";

export default function MyArticles() {
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>
        <ArticleList></ArticleList>
        <Rightbar></Rightbar>
      </Stack>
    </Box>
  );
}
