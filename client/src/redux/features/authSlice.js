import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.logIn(formValue);
      toast.success("Login successfully", {autoClose: 1000});
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, {rejectWithValue}) => {
    try {
      console.log("hello get current user aync reached");
      const response = await api.getUserData();
      console.log("user data got,", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.SignUp(formValue);
      toast.success("Account created successfully", {autoClose: 1000});
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({profileData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("111111111111");
      const response = await api.UpdateProfile(profileData, Id);
      toast.success("Profile updated successfully", {autoClose: 1000});
      navigate("/student/profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async (fd, {rejectWithValue}) => {
    try {
      console.log("update pic thunk");
      const response = await api.UpdateProfilePic(fd);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followOne = createAsyncThunk(
  "auth/follow",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("1111111followwwwww");
      console.log(userData);
      const response = await api.followOne(userData, Id);
      toast.success("started following");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followExpert = createAsyncThunk(
  "auth/followExpert",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("1111111followwwwww");
      console.log(userData);
      const response = await api.followExpert(userData, Id);
      toast.success("started following");
      navigate("/student/ViewExpertProfile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unfollowExpert = createAsyncThunk(
  "auth/unfollowExpert",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("1111111  unfollowwwwww");
      console.log(userData);
      const response = await api.unfollowExpert(userData, Id);
      toast.success(" unfollowing");
      navigate("/student/ViewExpertProfile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFollowersData = createAsyncThunk(
  "auth/getfollowers",
  async ({navigate}, {rejectWithValue}) => {
    try {
      console.log("hello get folowers data reached");
      const response = await api.getFollowers();
      console.log("got folowers data reached", response);
      navigate("/student/followers");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFollowingsData = createAsyncThunk(
  "auth/getfollowings",
  async ({navigate}, {rejectWithValue}) => {
    try {
      console.log("hello get followings data reached");
      const response = await api.getFollowings();
      navigate("/student/followings");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFriendsData = createAsyncThunk(
  "auth/getfriends",
  async (navigate, {rejectWithValue}) => {
    try {
      console.log("hello get friends data reached");
      const response = await api.getFriends();
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const unFollowOne = createAsyncThunk(
  "auth/unfollow",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("unfollowwwwww");
      console.log(userData);
      const response = await api.unFollowsOne(userData, Id);
      toast.success("started unfollowing");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getStudentProfile = createAsyncThunk(
  "auth/getProfile",
  async ({userId, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.getStudentProfile(userId);
      console.log(response);
      navigate("/student/viewProfile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getExpertProfile = createAsyncThunk(
  "auth/getExpertProfile",
  async ({userId, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.getExpertProfile(userId);
      console.log(response);
      navigate("/student/viewExpertProfile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth", // the name used in the useSelector,also in store
  initialState: {
    user: null,
    profile: null,
    expert: null,
    followers: null,
    followings: null,
    friends: null,
    error: "",
    loading: false,
  },

  reducers: {
    setLogout: (state, action) => {
      localStorage.removeItem("userToken");
      state.user = null;
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;

      let {token} = action.payload;
      console.log("student login");
      localStorage.setItem("userToken", JSON.stringify(token));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getCurrentUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("student data  fulfilled");
      state.user = action.payload;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;

      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      let {token} = action.payload;
      console.log("student login");
      localStorage.setItem("userToken", JSON.stringify(token));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;

      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      state.user.result = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProfilePic.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfilePic.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      state.user.result = action.payload;
    },
    [updateProfilePic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },

    [followOne.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [followOne.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("follow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.user;
      state.profile.user = action.payload.following;
    },
    [followOne.rejected]: (state, action) => {
      console.log("follow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [followExpert.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [followExpert.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("follow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.currentUser;
      state.expert = action.payload.followed;
    },
    [followExpert.rejected]: (state, action) => {
      console.log("follow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [unFollowOne.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [unFollowOne.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("unfollow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.currentUser;
      state.expert = action.payload.unfollowed;
    },
    [unFollowOne.rejected]: (state, action) => {
      console.log("unfollow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [unfollowExpert.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [unfollowExpert.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("unfollow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.user;
      state.profile.user = action.payload.unfollowing;
    },
    [unfollowExpert.rejected]: (state, action) => {
      console.log("unfollow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [getFollowersData.pending]: (state, action) => {
      console.log("get followers pending");
      state.loading = true;
    },
    [getFollowersData.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get followers fulfilled");
      state.followers = action.payload;
    },
    [getFollowersData.rejected]: (state, action) => {
      state.loading = false;
      console.log("get followers rejected");
      state.error = action.payload.message;
    },

    [getFriendsData.pending]: (state, action) => {
      console.log("get friends pending");
      state.loading = true;
    },
    [getFriendsData.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get friends fulfilled");
      state.friends = action.payload;
    },
    [getFriendsData.rejected]: (state, action) => {
      state.loading = false;
      console.log("get friends rejected");
      state.error = action.payload.message;
    },

    [getFollowingsData.pending]: (state, action) => {
      console.log("get followings pending");
      state.loading = true;
    },
    [getFollowingsData.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get followings fulfilled");
      state.followings = action.payload;
    },
    [getFollowingsData.rejected]: (state, action) => {
      state.loading = false;
      console.log("get followings rejected");
      state.error = action.payload.message;
    },

    [getStudentProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudentProfile.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("student profile");
      console.log(action.payload);
      state.profile = action.payload;
    },
    [getStudentProfile.rejected]: (state, action) => {
      state.loading = false;
      console.log("hello");
      console.log(action);
      state.error = action.payload.message;
    },

    [getExpertProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getExpertProfile.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("expert profile");
      console.log(action.payload);
      state.expert = action.payload;
    },
    [getExpertProfile.rejected]: (state, action) => {
      state.loading = false;
      console.log("hello");
      console.log(action);
      state.error = action.payload.message;
    },
  },
});
export const {setLogout} = authSlice.actions;

export default authSlice.reducer;
