import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import * as api from "../api";

export const getConversation = createAsyncThunk(
  "chat/getConversation",
  async (Id, {rejectWithValue}) => {
    try {
      console.log("get conversation async reached");
      const response = await api.getConversation(Id);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getExpertConversation = createAsyncThunk(
  "chat/getExpertConversation",
  async (Id, {rejectWithValue}) => {
    try {
      console.log("get conversation async reached");
      const response = await api.getExpertConversation(Id);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async ({conversation, navigate}, {rejectWithValue}) => {
    try {
      console.log("create conversation async reached");
      const response = await api.createConversation(conversation);
      navigate("/messenger");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createExpertConversation = createAsyncThunk(
  "chat/createConversation",
  async ({conversation, navigate}, {rejectWithValue}) => {
    try {
      console.log("create conversation async reached");
      const response = await api.createConversation(conversation);
      navigate("/Expertmessenger");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  "chat/getMessage",
  async (Id, {rejectWithValue}) => {
    try {
      console.log("get message async reached");
      const response = await api.getMessage(Id);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async ({data}, {rejectWithValue}) => {
    try {
      console.log("create message async reached");
      const response = await api.createMessage(data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    conversation: "null",
    messages: [],
    message: "null",
    loading: "false",
    error: "",
  },
  extraReducers: {
    [getConversation.pending]: (state, action) => {
      state.loading = true;
    },
    [getConversation.fulfilled]: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },
    [getConversation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getExpertConversation.pending]: (state, action) => {
      state.loading = true;
    },
    [getExpertConversation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("hello got expert conversation", action.payload);
      state.conversations = action.payload;
    },
    [getExpertConversation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createConversation.pending]: (state, action) => {
      state.loading = true;
    },
    [createConversation.fulfilled]: (state, action) => {
      state.loading = false;
      state.conversation = action.payload;
    },
    [createConversation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createExpertConversation.pending]: (state, action) => {
      state.loading = true;
    },
    [createExpertConversation.fulfilled]: (state, action) => {
      state.loading = false;
      state.conversation = action.payload;
    },
    [createExpertConversation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [createMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [createMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getMessages.pending]: (state, action) => {
      state.loading = true;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    [getMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default chatSlice.reducer;
