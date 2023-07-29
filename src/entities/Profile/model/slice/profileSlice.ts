import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData, updateProfileData } from 'entities/Profile';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    // значения по умолчанию объявим
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true; // вернем форму в состояние для чтения
            state.form = state.data; // присвоим то что получили с сервака - те сбрасываем все что навводили внутри инпута
        },
        updateProfile: (state, action: PayloadAction<Profile>) => { // обновляем весть Профиль - всю data что храним в стеите
            state.form = { // меняем (копируем) поле data у объекта state - создаем новый объект -
                ...state.form, // разворачиваем в него старую data
                ...action.payload, // и разворачиваем новую data
            };
        },
    },
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
                state.data = action.payload; // получили и не меняем
                state.form = action.payload; // можем менять данные
                // чтобы эти данные могли использовать в компоненте делаем селекторы по обработке состояний и получения данных для их отрисовки
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })

            .addCase(updateProfileData.fulfilled, (
                state,
                action: PayloadAction<Profile>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })

            .addCase(updateProfileData.rejected, (state, action) => {
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
- Санок может быть сколько угодно а слайс один!
 */
