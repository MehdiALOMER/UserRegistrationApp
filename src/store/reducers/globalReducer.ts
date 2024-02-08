import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { GlobalService } from '@/services/globalService';


const getAllCountriesThunk = createAsyncThunk("country/getAll", async (payload: void, { dispatch }) => {
    dispatch(setLoading(true));
    let response = await GlobalService.getAllCountries();

    if (response?.status === 200) {
        dispatch(setLoading(false));
        return response.data;
    } else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        countryList: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCountriesThunk.fulfilled, (state, action) => {
            // action.payload içindeki diziyi dön ve label ve value değerlerini alarak yeni bir dizi oluştur.
            state.countryList = action.payload.map((country: any) => {
                return {
                    label: country.name.common,
                    value: country.name.common
                }
            });
        });
    }
});

export const { } = globalSlice.actions;

export { getAllCountriesThunk };

export default globalSlice.reducer;