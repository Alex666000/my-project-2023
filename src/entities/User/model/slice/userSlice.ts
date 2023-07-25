import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = { };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state) {

        },
        decrement(state) {

        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

/*
- Скопировали слайс из соседнего файла и переделываем под себя
- Поменяли название с actions на counterActions: export const { actions: counterActions } = userSlice;
- Также меняем на более осмысленное название у редюсера
- В паблик апи экспортируем userActions, userReducer
- Тип указываем для User в types
- Пути правим на относительные - относительно модуля import { UserSchema } from '../types/user';
- Вернемся в паблик апи и экспортируем еще и типы чтобы потом смогли в StateSchema всего Арр
их импортировать из паблика: UserSchema, User
- Добавляем в типизацию StateSchema Арр -> UserSchema
- export interface StateSchema {
    // стейты конкретных сущностей
    counter: CounterSchema;
    user: UserSchema
}
-
 */
