import { IUserInfo, IUserWorkingStatusAndProfessionInformation } from '@/types/dataTypes';
import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {} as IUserInfo,
        userWorkingStatusAndProfessionInformation: {} as IUserWorkingStatusAndProfessionInformation,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setuserWorkingStatusAndProfessionInformation: (state, action) => {
            state.userWorkingStatusAndProfessionInformation = action.payload;
        }
    },
});

export const { setUserInfo, setuserWorkingStatusAndProfessionInformation } = userInfoSlice.actions;

export default userInfoSlice.reducer;