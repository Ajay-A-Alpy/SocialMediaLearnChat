// import { configureStore } from "@reduxjs/toolkit";

// import AuthReducer from '../redux/features/authSlice';
// import ArticleReducer from '../redux/features/articleSlice';
// import ExpertReducer from '../redux/features/expertAuthSlice'

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//     key: 'root',
//     storage,
//   }

//   const persistedReducer = persistReducer(persistConfig,AuthReducer);


// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist';


// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist:['expertAuth']
//   }



// const rootReducer= combineReducers({
 
//         auth:AuthReducer,
//         article:ArticleReducer,
//         expertAuth:ExpertReducer
   
// })

// const persistedReducer = persistReducer(persistConfig,rootReducer)

// export const store =configureStore({
//     reducer:persistedReducer

// })


// // export const store= configureStore({
// //     reducer:persistedReducer,
// //     middleware: [thunk]
// // })


// export const persistor = persistStore(store)

  