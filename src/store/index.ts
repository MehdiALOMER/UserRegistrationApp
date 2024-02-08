import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import userInfoReducer from './reducers/userInfoReducer';
import globalReducer from './reducers/globalReducer';


const store = configureStore({
  reducer: {
    loadingReducer,
    userInfoReducer,
    globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;