import { Country, Currency } from 'shared/const/common';

export interface Profile {
    first: string;
    lastname: string;
    age: 22,
    currency: Currency,
    country: Country;
    city: string,
    username: string;
    avatar: string;
}

// тип ProfileSchema - схема того как профиль будет хранится в стейте
export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean; // флаг - доступен ли Юзер для редактирования или он только readonly
}

/*
- потом открываем паблик апи и экспортируем Profile и ProfileSchema
- после создаем слайс с помощью которого  профиль будем изменять или хранить
 */
