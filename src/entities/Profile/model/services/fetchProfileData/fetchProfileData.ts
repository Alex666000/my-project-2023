import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile, // принимаем с сервера данные такие...
    string, // отправляем на сервер аргументы
    ThunkConfig<string>
    >(
        'profile/fetchProfileData',
        async (profileId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`);

                if (!response.data) {
                    throw new Error();
                }
                console.log(response.data);

                return response.data;
            } catch (e) {
                console.log('Попали в catch ');
                return rejectWithValue('error');
            }
        },
    );
