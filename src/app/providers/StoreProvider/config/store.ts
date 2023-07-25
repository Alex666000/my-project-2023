import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

// Создаем store
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            // 7) добавляем редюсеры потом надо сущности добавить куда-то чтобы отрисовать...
            counter: counterReducer,

        },
        devTools: __IS_DEV__, // отключаем девтулзы для продакшена
        preloadedState: initialState,
    });
}

/*
- initialState?: StateSchema - инициализируем стор - понадобятся эти данные для тестов

-

-
 */
