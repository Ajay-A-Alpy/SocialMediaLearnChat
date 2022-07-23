import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.adminLogIn(formValue);
      toast.success("Login successfully");
      navigate("/admin");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllArticles = createAsyncThunk(
  "admin/articles",
  async (navigate, {rejectWithValue}) => {
    try {
      const response = await api.getAllArticles();
      navigate("/admin/articles");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllStudents = createAsyncThunk(
  "admin/students",
  async (navigate, {rejectWithValue}) => {
    try {
      const response = await api.getAllStudents();
      navigate("/admin/students");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllExperts = createAsyncThunk(
  "admin/experts",
  async (navigate, {rejectWithValue}) => {
    try {
      const response = await api.getAllExperts();
      navigate("/admin/experts");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: "",
    allStudents: [],
    allArticles: [],
    allExperts: [],
  },

  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      console.log("admin setting");
    },

    setAdminLogout: (state, action) => {
      localStorage.removeItem("adminProfile");
      localStorage.removeItem("adminToken");
      state.admin = null;
    },
  },

  extraReducers: {
    [adminLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [adminLogin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("adminProfile", JSON.stringify({...action.payload}));
      let {token} = action.payload;
      console.log("expert login");
      localStorage.setItem("adminToken", JSON.stringify(token));
      state.admin = action.payload;
    },
    [adminLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllArticles.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.allArticles = action.payload;
    },
    [getAllArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getAllStudents.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllStudents.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("got students", action.payload);
      state.allStudents = action.payload;
    },
    [getAllStudents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getAllExperts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllExperts.fulfilled]: (state, action) => {
      state.loading = false;
      state.allExperts = action.payload;
    },
    [getAllExperts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {setAdmin, setAdminLogout} = adminSlice.actions;

export default adminSlice.reducer;
