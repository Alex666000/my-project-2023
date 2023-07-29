import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            // логика по сохранению данных профиля (селекторы в санках нельхя использовать - поэтому getState)
            const formData = getProfileForm(getState());

            try {
                const response = await extra.api.put<Profile>('/profile', formData); // put - запрос на обновление данных

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );

/*
- после написания санки - идем писать экстраредюсеры в profileSlice
(Санок может быть сколько угодно а слайс один!)
 */
