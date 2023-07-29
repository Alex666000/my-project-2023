import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';
import { Profile, ValidateProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    // ThunkConfig<string>
    ThunkConfig<ValidateProfileError []> // в случае ошибки ожидаем теперь массив ValidateProfileError вместо строки...
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            // логика по сохранению данных профиля (селекторы в санках нельхя использовать - поэтому getState)
            const formData = getProfileForm(getState());

            const errors = validateProfileData(formData); // валидируем formData

            if (errors.length) {
                return rejectWithValue(errors); // если ошибка валидация нашла то...
            }

            try {
                const response = await extra.api.put<Profile>('/profile', formData); // put - запрос на обновление данных

                if (!response.data) { // заглушка тк сервер фейковый у нас - для тестов надо если данные не вернулись чтоб тест санки стрелял
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );

/*
- после написания санки - идем писать экстраредюсеры в profileSlice
(Санок может быть сколько угодно а слайс один!)
 */
