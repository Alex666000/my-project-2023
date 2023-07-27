import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profile';

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
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

/*
В рамках одного модуля пути относительные
- Идем в главный компонент ProfilePage  там все обернем в DynamicModuleLoader - изолировать редюсер
будем на уровне страницы
 */
