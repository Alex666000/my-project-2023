import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from 'entities/Profile';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    // значения по умолчанию объявим
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (
                state,
                action: PayloadAction<Profile>,
            ) => {
                state.isLoading = false;
                // сохраняем полученные данные от сервера в наш стейт в поле data
                state.data = action.payload;
                // чтобы эти данные могли использовать в компоненте делаем селекторы по обработке состояний и получения данных для их отрисовки
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

/*
В рамках одного модуля пути относительные
- Идем в главный компонент ProfilePage  там все обернем в DynamicModuleLoader - изолировать редюсер
будем на уровне страницы
 */
