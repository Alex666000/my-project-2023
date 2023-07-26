import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = { };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // помещаем данные в стейт - ожидаем тип User на вход
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            // далее идем в санку loginByUsername и там диспатчим эти экшены сюда в редюсер
        },
        // ...Далее надо сделать логику что после перезагрузки страница (или закрытия и открытия вкладки)
        // зареганым Юзером - что Юзер авторизован - идем в userSlice
        // Достаем данные о Юзере из ЛС
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                // помещаем в стейт эти данные - распарсив обратно из строки в объект
                state.authData = JSON.parse(user);
                // Далее в самом корне приложения initAuthData будем вызывать в Арр идет в него -->
            }
        },
        logout: (state) => {
            state.authData = undefined; // очищаем стейт
            localStorage.removeItem(USER_LOCALSTORAGE_KEY); // удаляем токен с данными о Юзере
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
- ... после того как сделали фичу AuthByUserName - данные по авторизации надо сохранять в стейт
и в зависимости от того есть эти данные или нет - мы будем определять авторизован ли User или нет

 */
