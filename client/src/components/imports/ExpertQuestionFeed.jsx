import {Box} from "@mui/system";
import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Stack} from "@mui/material";
import {getQuestions} from "../../redux/features/questionSlice";
import Questions from "./Questions";
import Pagination from "@mui/material/Pagination";
import {useRef} from "react";

export default function ExpertQuestionFeed() {
  const {questions, loading} = useSelector((state) => ({...state.question}));
  const countRef = useRef(0);
  const {expert} = useSelector((state) => ({...state.expertAuth}));
  const [pageSize, setPageSize] = useState(4);
  const [pageNum, setPageNum] = useState(1);
  const user = expert;
  const [all, setAll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const handlePagination = (e, page) => {
    setPageNum(page);
  };
  return (
    <>
      <Stack
        direction="column"
        flex={4}
        sx={{
          backgroundColor: "#F2F2F2",
          height: "100vh",
          borderRight: "1px solid #c1cbd6",
          borderLeft: "1px solid #c1cbd6",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
          }}
        >
          {questions.map((item, i) => {
            countRef.current = +1;
            if (i > (pageNum - 1) * pageSize && i <= pageNum * pageSize)
              return <Questions key={item._id} {...item}></Questions>;
          })}
        </Box>

        <Stack
          spacing={2}
          sx={{
            marginX: "auto",
            position: "fixed",
            bottom: "1rem",
            right: "50%",
          }}
        >
          <Pagination
            count={Math.ceil(questions?.length / pageSize)}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      </Stack>
    </>
  );
}
