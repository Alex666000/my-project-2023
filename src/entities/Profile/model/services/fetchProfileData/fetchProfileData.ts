import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Profile>('/profile');

            return response.data; // вернули данные - а в экстраредюсере их получаем и присваиваем в стейт
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

/*
- Profile а не ProfileSchema (тк как бэк возвращает данные о пользователе а не всю схему целиком) -
ожидаем в ответе данные которые получаем о пользователе,
 void, -- аргуементов не ожидаем пока
- пути в рамках модуля на относительные...
- санку добавляем в паблик
- потом используем санку внутри нашей страницы ProfilePage (внутри эффекта будем з0апрашивать данные)
 */
