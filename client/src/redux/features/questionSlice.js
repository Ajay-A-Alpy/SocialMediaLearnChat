import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import * as api from "../api";

export const createQuestion = createAsyncThunk(
  "question/create",
  ({fd, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("hello questions", fd);
      const response = api.AddQuestions(fd);
      toast.success("You have succefully asked ", {autoClose: 1000});
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getQuestions = createAsyncThunk(
  "questions/get",
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.GetArticles();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const QuestionSlice = createSlice({
  name: "question", // use this name in useSelector,also in store

  initialState: {
    question: {},
    questions: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [createQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("hello questions created successfully thunk");
      state.question = action.payload;
    },
    [createQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default QuestionSlice.reducer;
