import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from '../redux/features/authSlice';
import ArticleReducer from '../redux/features/articleSlice';
import ExpertReducer from '../redux/features/expertAuthSlice'

export default configureStore({
    reducer:{
        auth:AuthReducer,
        article:ArticleReducer,
        expertAuth:ExpertReducer
    }
})