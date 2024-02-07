import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import userInfoReducer from './reducers/userInfoReducer';


const store = configureStore({
  reducer: {
    loadingReducer,
    userInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;