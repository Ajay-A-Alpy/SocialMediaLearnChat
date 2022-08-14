import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {CircularProgress, Stack, Typography} from "@mui/material";
import {getQuestions} from "../../redux/features/questionSlice";
import Questions from "./Questions";
import ButtonGroup from "@mui/material/ButtonGroup";
import {useRef} from "react";
import Pagination from "@mui/material/Pagination";
export default function QuestionFeed() {
  const {questions, loading} = useSelector((state) => ({...state.question}));
  const countRef = useRef(0);
  const {user} = useSelector((state) => ({...state.auth}));
  const [all, setAll] = useState(false);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(4);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    console.log("feed articles");
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
            height: "2rem",
            width: "80%",

            height: "auto",
            margin: "1rem auto",
          }}
        >
          <ButtonGroup disableElevation variant="outlined">
            <Button
              onClick={() => {
                setAll(false);
                countRef.current = 0;
              }}
            >
              My Questions
            </Button>
            <Button
              onClick={() => {
                setAll(true);
                countRef.current = 0;
              }}
            >
              All Questions
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
          }}
        >
          {all
            ? questions.map((item, i) => {
                countRef.current = +1;
                if (i > (pageNum - 1) * pageSize && i <= pageNum * pageSize)
                  return <Questions key={item._id} {...item}></Questions>;
              })
            : questions.map((item, i) => {
                if (user?.result._id === item.userId) {
                  countRef.current = +1;
                  if (i > (pageNum - 1) * pageSize && i <= pageNum * pageSize)
                    return <Questions key={item._id} {...item}></Questions>;
                }
              })}
          {countRef.current == 0 ? (
            <Box
              sx={{
                height: "2rem",
                width: "80%",

                height: "auto",
                margin: "1rem auto",
              }}
            >
              <Typography> No Questions found ... </Typography>
            </Box>
          ) : (
            ""
          )}
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
