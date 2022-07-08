import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const createArticle = createAsyncThunk(
  "article/create",
  ({ fd, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = api.AddArticle(fd);
      toast.success("You have succefully posted ");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getArticles = createAsyncThunk(
  "article/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetArticles();
    

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const updateArticle = createAsyncThunk(
    "article/update",
    ({ fd,id,  toast }, { rejectWithValue }) => {
      try {
        const response = api.UpdateArticle(fd,id);
        toast.success("You have updated posted ");
        window.location.reload()
        return response.data;
      } catch (err) { 
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const deleteArticle=createAsyncThunk("article/delete",({id},{rejectWithValue})=>{
    try{
        const response=api.DeleteArticle(id);
        <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        successfully deleted<strong>check it out!</strong>
      </Alert>
        
        window.location.reload();
        return response.data

    }
    catch(error){
        return rejectWithValue(error.response.data)
    }
  })




const articleSlice = createSlice({
  name: "article", // use this name in useSelector,also in store

  initialState: {
    article: {},
    articles: [],
    userArticle: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createArticle.pending]: (state, action) => {
      state.loading = true;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    [createArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getArticles.pending]: (state, action) => {
      state.loading = true;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    [getArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateArticle.pending]: (state, action) => {
        state.loading = true;
      },
      [updateArticle.fulfilled]: (state, action) => {
        state.loading = false;
        state.article = action.payload;
      },
      [updateArticle.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

  },
});

export default articleSlice.reducer;
