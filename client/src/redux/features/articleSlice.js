import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import * as api from '../api'

export const createArticle=createAsyncThunk('article/create',({updatedArticleData,navigate,toast},{rejectWithValue})=>{
try{

    const response=  api.AddArticle(updatedArticleData);
    toast.success("You have succefully posted ");
    navigate("/")
    return response.data
}
catch(err){
    return rejectWithValue(err.response.data);
}

})

const articleSlice=createSlice({
    
    name:"article", // use this name in useSelector

    initialState:{
        article:{},
        articles:[],
        userArticle:[],
        error:"",
        loading:false,

    },
    extraReducers:{
        [createArticle.pending]:(state,action)=>{
            state.loading= true;

        },
        [createArticle.fulfilled]:(state,action)=>{
            state.loading=false;
            state.articles=action.payload;

        },
        [createArticle.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        }
        
    }

})

export default  articleSlice.reducer;