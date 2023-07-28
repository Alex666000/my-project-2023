import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// Санка для того - чтобы отправить данные и их вернуть - результат что в БД данные ушли поменялись
// там и мы получили ответ что успешно и какие данные получаем обратно их
// После того как данные вернули идем в слайс и в экстраредбсере (для асинхронного изменения)
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
    >(
        'login/loginByUsername',
        async (authData, thunkAPI) => {
            const { extra, dispatch, rejectWithValue } = thunkAPI;

            try {
            // const response = await axios.post<User>('http://localhost:8000/login', authData);
                const response = await extra.api.post<User>('/login', authData);

                if (!response.data) { // если с сервера нам вернулся пустои ответ, а не данные то...
                    throw new Error();
                }

                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)); // когда будем разлогиневаться эти данные с ЛС
                // будем удалять - имитация авторизации как-будто храним токен...

                // Далее надо сделать логику что после перезагрузки страница (или закрытия и открытия вкладки)
                // зареганым Юзером - что Юзер авторизован - идем в userSlice

                // диспатчим эти экшены в редюсер userSlice.ts - сюда передаем  данные которые получили с сервера -
                // идем на строку 24 - также в ЛС будем хранить токен - авторизованы мы или нет (имитация авторизации...)
                dispatch(userActions.setAuthData(response.data));
                /* extra.navigate('/about'); */ // как залогинелись редирекнуло на страницу...

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );

/*
- 15 - сразу рядом создаем файл для тестов, название фанки login=название фичи/название санки
установим axios: npm i axios@0.26.1 - http://localhost:8000/login - адрес сервера
- authData - в тело запроса передаем username и пароль: передаем объектом или деструктуризируем в скобках после async
- Типизация createAsyncThunk - 1 аргумент то что мы возвразщаем (сервак после авторизации вернет данные о пользователе и мы их будем
сохранять в др участок стейта) 2- аргумент - то что ожидаем на вход 3 - типизируем ошибку
- return thunkAPI.rejectWithValue('Вы ввели неверный логин или пароль'); --  rejectWithValue, обработка ошибки - тут используем переводы
напрямую хук импортировать сюда не можем поэтому так: см стр.

- 34 видео  47 мин - что делать если у нас может быть несколько сообщений об ошибке

- 38 видео:
у thunkAPI есть аргумент extra в который можно  положить любые вспомогательные функции - данные -в него
инстанс нашего api будем помещать -- при конфигурации store.ts укажем мидлвейр --> ...

middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),

- делаем запрос теперь через экстра...
- теперь указываем эндпоинт '/login' - тк адрес прописали в baseUrl
-  ThunkConfig<string> -  ошибка уточнена строкой - должна быть стринговая
 */
