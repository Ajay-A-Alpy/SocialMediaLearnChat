import {configureStore} from "@reduxjs/toolkit";

import AuthReducer from "../redux/features/authSlice";
import ArticleReducer from "../redux/features/articleSlice";
import ExpertReducer from "../redux/features/expertAuthSlice";
import ChatReducer from "../redux/features/chatSlice";
import AdminReducer from "../redux/features/adminSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    article: ArticleReducer,
    expertAuth: ExpertReducer,
    chat: ChatReducer,
    admin: AdminReducer,
  },
});
