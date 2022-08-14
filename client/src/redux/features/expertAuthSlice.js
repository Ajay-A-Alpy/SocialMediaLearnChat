import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const expertLogin = createAsyncThunk(
  "expert/login",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.expertLogIn(formValue);
      toast.success("Login successfully");
      navigate("/expert");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentExpertData = createAsyncThunk(
  "expert/getExpertData",
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.getExpertDetails();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const expertRegister = createAsyncThunk(
  "expert/register",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.expertSignUp(formValue);
      toast.success("Account created successfully");
      navigate("/expert");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const expertUpdateProfile = createAsyncThunk(
  "expert/updateProfile",
  async ({profileData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("111111111111");
      const response = await api.expertUpdateProfile(profileData, Id);
      toast.success("Profile updated successfully");
      navigate("/expert/profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getStudentsList = createAsyncThunk(
  "auth/getStudents",
  async (navigate, {rejectWithValue}) => {
    try {
      console.log("hello get my  students");
      const response = await api.getStudentData();
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const expertSlice = createSlice({
  name: "expert", // the name used in the useSelector,also in store
  initialState: {
    expert: {},
    error: "",
    loading: false,
    students: [],
  },

  reducers: {
    setExpert: (state, action) => {
      state.expert = action.payload;
      console.log("expert setting");
    },

    setExpertLogout: (state, action) => {
      localStorage.removeItem("expertProfile");
      localStorage.removeItem("expertToken");
      state.expert = null;
    },
  },

  extraReducers: {
    [expertLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [expertLogin.fulfilled]: (state, action) => {
      state.loading = false;
      let {token} = action.payload;
      console.log("expert login");
      localStorage.setItem("expertToken", JSON.stringify(token));
      state.expert = action.payload;
    },
    [expertLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getCurrentExpertData.pending]: (state, action) => {
      state.loading = true;
    },
    [getCurrentExpertData.fulfilled]: (state, action) => {
      state.loading = false;
      state.expert = action.payload;
    },
    [getCurrentExpertData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [expertRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [expertRegister.fulfilled]: (state, action) => {
      state.loading = false;
      let {token} = action.payload;
      console.log("expert login");
      localStorage.setItem("expertToken", JSON.stringify(token));
      state.expert = action.payload;
    },
    [expertRegister.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [expertUpdateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [expertUpdateProfile.fulfilled]: (state, action) => {
      state.loading = false;

      // localStorage.setItem("expertProfile",JSON.stringify({...action.payload}));
      state.expert.result = action.payload;
    },
    [expertUpdateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getStudentsList.pending]: (state, action) => {
      console.log("get students pending");
      state.loading = true;
    },
    [getStudentsList.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get students fulfilled");
      state.students = action.payload;
    },
    [getStudentsList.rejected]: (state, action) => {
      state.loading = false;
      console.log("get students rejected");
      state.error = action.payload.message;
    },
  },
});
export const {setExpert, setExpertLogout} = expertSlice.actions;

export default expertSlice.reducer;
