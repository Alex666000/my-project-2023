import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// На вход функция createReducerManager принимает дефолтные редюсеры

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers); // создаем корневой редюсер

    let keysToRemove: Array<StateSchemaKey> = []; // массив хранит название редюсеров которые хотим удалить например редюсер loginForm

    return {
        getReducerMap: () => reducers,
        // сам редюсер - reduce но если в массиве для удаления есть какие-то ключи то эти ключи из стейта полностью удаляем
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key]; // просто по ключу по названию удаляем редюсер = кусочек стейта
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action); // вернем новый редюсер в который передаем стейт без лишних ключей
        },
        // функция add - в редюсер по ключу добавляет новый редюсер
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        // добавляет ключ в массив и удаляет его из редюсера
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
