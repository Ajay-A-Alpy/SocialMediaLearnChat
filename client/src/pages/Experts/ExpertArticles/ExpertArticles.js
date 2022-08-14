import {Box} from "@mui/material";

import ExpertSidebar from "../../../components/imports/ExpertSidebar";
import Stack from "@mui/material/Stack";
import ExpertNavbar from "../../../components/imports/ExpertNavbar";
import ExpertRightbar from "../../../components/imports/ExpertRightbar";
import ExpertArticleList from "../../../components/imports/ExpertArticleList";

export default function ExpertArticles() {
  return (
    <Box>
      <Box bgcolor={""} color={"text.primary"}>
        <ExpertNavbar></ExpertNavbar>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <ExpertSidebar></ExpertSidebar>
          <ExpertArticleList></ExpertArticleList>
          <ExpertRightbar></ExpertRightbar>
        </Stack>
      </Box>
    </Box>
  );
}
