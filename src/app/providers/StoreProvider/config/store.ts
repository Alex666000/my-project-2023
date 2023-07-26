import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUserName';
import { StateSchema } from './StateSchema';

// Создаем store
export function createReduxStore(initialState?: StateSchema) {
    // корневой редюсер - добавляем сюда все редюсеры
    const rootReducers: ReducersMapObject<StateSchema> = {
        // 7) добавляем редюсеры потом надо сущности добавить куда-то чтобы отрисовать...
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__, // отключаем девтулзы для "продакшена"
        preloadedState: initialState,
    });
}

/*
- initialState?: StateSchema - инициализируем стор - понадобятся эти данные для тестов
- если сделать редюсер не обязательным то сделаем редюсер асинхронным - подгружать будем дальше как
асинхронные компоненты только в тот момент когда редюсер нам нужен (для оптимизации) - но пока оставим так...
-
-
 */
