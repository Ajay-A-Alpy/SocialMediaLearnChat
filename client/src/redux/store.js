import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from '../redux/features/authSlice';
import ArticleReducer from '../redux/features/articleSlice';

export default configureStore({
    reducer:{
        auth:AuthReducer,
        article:ArticleReducer
    }
})