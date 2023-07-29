import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

// типизация для валидации формы ProfileCard
export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA', // некорректное имя или фамилия
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

// данные профиля что получаем с БД с сервера
export interface Profile {
    first?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}

// тип ProfileSchema - схема того как профиль будет хранится в стейте
export interface ProfileSchema {
    data?: Profile; // храним данные которые получили от сервера - неизменяема - получили с сервака и не меняем
    form?: Profile // храним то что наизменял польщователь - меняетсяпри вводе в инпут
    isLoading: boolean;
    error?: string;
    readonly: boolean; // флаг - доступен ли Юзер для редактирования или он только readonly
    // в стейт добавляем новое поле валидации
    validateErrors?: ValidateProfileError[];
}

/*
- потом открываем паблик апи и экспортируем Profile и ProfileSchema
- после создаем слайс с помощью которого  профиль будем изменять или хранить
 */
