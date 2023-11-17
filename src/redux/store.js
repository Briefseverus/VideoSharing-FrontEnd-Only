import {configureStore,combineReducers } from '@reduxjs/toolkit' 
import authReducer from './authSlice'
import channelSlice from './channelSlice';
import videoSlice from './videoSlice';
import userSlide from './userSlide';
import tagSlice from './tagSlice'
import categoriesSlide from './categoriesSlice'
import commentSlide from './commentSlide'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
const rootReducer = combineReducers({auth: authReducer, channels: channelSlice, videos: videoSlice, users: userSlide, tags : tagSlice, categories: categoriesSlide, comments: commentSlide});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
export let persistor = persistStore(store);