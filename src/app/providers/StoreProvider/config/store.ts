import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { StateSchema } from './StateSchema';

// Создаем store
export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    // корневой редюсер - добавляем сюда все редюсеры
    const rootReducers: ReducersMapObject<StateSchema> = {
        // Полученные асинхронные  редюсеры из вне разворачиваем в корневой  редюсер
        ...asyncReducers,

        // добавляем редюсеры
        counter: counterReducer,
        user: userReducer,
        // loginForm: loginReducer, -- удаляем асинхронные редюсеры

    };

    const reducerManager = createReducerManager(rootReducers); // создаем reducerManager

    const store = configureStore<StateSchema>({
        // reducer: rootReducers,
        reducer: reducerManager.reduce, // вместо строки 22 теперь этот код для асинхр.редюсеров
        devTools: __IS_DEV__, // отключаем девтулзы для "продакшена"
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager; // Добавляем к стору reducerManager - овое поле добавили к стору...
    return store;
}

/*
- initialState?: StateSchema - инициализируем стор - понадобятся эти данные для тестов
- если сделать редюсер не обязательным то сделаем редюсер асинхронным - подгружать будем дальше как
асинхронные компоненты только в тот момент когда редюсер нам нужен (для оптимизации) - но пока оставим так...
--------------------------------------------------------------------------------------------------------------------------------------------
                            35 VIDEO: асинхронные редюсеры делаем:
- вынесем configureStore в переменную store
- создадим файлик - reducerManager -- функцию createReducerManager
- // создаем reducerManager путем вызова createReducerManager -- теперь идем в типизацию StateSchema - и теперь
можем loginForm сделать необязательным
- Удаляем loginForm: loginReducer, тк Асинхронные редюсеры (их удаляем из rootReducers в store.ts - ни не обязательны -
в корневом редюсере оставляем только обязательные редюсеры)
- создаем тип для reducerManager в файле StateSchema
- Далее когда все готово идем в LoginForm.tsx
- При создании reducerManager - теперь надо тут вызывать не рутовый редюсер reducer: rootReducers, а редюсер у
reducerManager стр 23 --- reducer: reducerManager.reduce,

- Добавили asyncReducers 2 аргумент в createReduxStore
 */
