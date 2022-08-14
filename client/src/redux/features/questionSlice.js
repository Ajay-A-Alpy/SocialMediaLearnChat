import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import * as api from "../api";

export const createQuestion = createAsyncThunk(
  "question/create",
  ({fd, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("hello questions", fd);
      const response = api.AddQuestions(fd);
      toast.success("You have succefully asked ", {autoClose: 1000});
      navigate("/student/questions");
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
      const response = await api.GetQuestions();
      console.log("fffffffffffffff", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/delete",
  ({id, toast}, {rejectWithValue}) => {
    try {
      const response = api.DeleteQuestion(id);
      toast.success("You have succefully deleted ", {autoClose: 1000});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const answerQuestion = createAsyncThunk(
  "question/comment",
  (data, {rejectWithValue}) => {
    try {
      const response = api.addAnswer(data);
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
      state.question = action.payload;
    },
    [createQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getQuestions.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("hello questions got successfully thunk");
      state.questions = action.payload;
    },
    [getQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default QuestionSlice.reducer;
