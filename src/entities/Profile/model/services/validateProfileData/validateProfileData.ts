import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) { // если профиль не проинициализирован то:
        return [ValidateProfileError.NO_DATA];
    }

    const {
        first, lastname, age, country, // поля которые валидируем
    } = profile;

    const errors: ValidateProfileError[] = []; // массив ошибок

    // Проверки
    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA); // добавляем в массив errors...
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
/*
- прописали типизацию, прописали логику функции потом идем в санку updateProfileData
- создаем селектор для получения массива ошибок getProfileValidateErrors и в паблик его...
- на уровне страницы (ProfilePage) получаем валидационные ошибки, отрисовываем и на уровне слайса profileSlice
в экстраред...
- для каждои ошибки  надо отображать правильные переводы в ProfilePage
 */
