import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/logimSchema';

const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(loginByUsername.pending, (state) => {
        //         state.error = undefined;
        //         state.isLoading = true;
        //     })
        //     .addCase(loginByUsername.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //     })
        //     .addCase(loginByUsername.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload;
        //     });
    },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;

/*
3 - Делаем редюсеры с помощью которых будем менять  логин и пароль
action: PayloadAction<string> - какие данные ожидаем внутри экшена
принимаем логин и пароль из вне из инпутов в которые пользователь что-то ввел -
ожидаем string
4- на UI в LoginForm воспользуемся тем что сделали тут в слайсе...
 */
