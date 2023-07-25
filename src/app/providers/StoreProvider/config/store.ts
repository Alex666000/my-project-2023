import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

// Создаем store
export function createReduxStore(initialState?: StateSchema) {
    // корневой редюсер - добавляем сюда все редюсеры
    const rootReducers: ReducersMapObject<StateSchema> = {
        // 7) добавляем редюсеры потом надо сущности добавить куда-то чтобы отрисовать...
        counter: counterReducer,
        user: userReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__, // отключаем девтулзы для "продакшена"
        preloadedState: initialState,
    });
}

/*
- initialState?: StateSchema - инициализируем стор - понадобятся эти данные для тестов

-

-
 */
