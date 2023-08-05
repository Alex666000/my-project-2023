import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsSchema } from 'entities/Article';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

// Типизируем store всего Арр:
export interface StateSchema {
    // стейты конкретных сущностей
    counter: CounterSchema;
    user: UserSchema

    // Асинхронные редюсеры -- (их удаляем из rootReducers в store.ts - не обязательны - в корневом редюсере оставляем только обязательные редюсеры)
    // Добавляем поля с таким-то типом:
    loginForm?: LoginSchema // сделаем необязательным -  редюсер будем добавлять его асинхронно с помощью reducerManager
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema // необязательным поле делаем - редюсер будет асинхронным - потом подключаем редюсер
    articleDetailsComments?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
}

// 35 Видео:
export type StateSchemaKey = keyof StateSchema

// создаем тип для reducerManager:
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

// отдельно типизировали 3 аргумент санки для ошибки
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}

/*
- Все участки стеита  будем называть с приставкои Schema - данные которые хранятся в стейте
- 3) StateSchema - состоит из кусочков стейта что объявлена и типизирована в папке конкретной сущности в model -- types
- 4) импортируем кусочек стейта из паблик_апи - добавляем в паблик_апи сущности Counter: редюсер, тип и сам счётчик Counter, CounterSchema, counterReducer
- Проверяем чтобы импорты были короткие из паблик апи а не из внутренностей самого entity
- Идем в store  добавляем редюсер
8) Подключаем loginForm  --- loginForm: LoginSchema --> если сделать его не обязательным то сделаем редюсер асинхронным - подгружать будем дальше как
 асинхронные компоненты только в тот момент когда редюсер нам нужен (для оптимизации) - но пока оставим так...
9) Экспортим loginReducer из паблик апи после чего подключаем его к rootReducers в файле store.ts
возвращаемся к селектору getLoginState и он нам подскажет что уже loginForm уже есть
-----------------------------------------------------------------------------------------------------------------------------
                                                    35 Видео:
- допишем тип StateSchemaKey для асинхронных редюсеров для логики reducerManager-a...
- keyof -- ключи название редюсеров достаем - например создаем объект const keyFromState: StateSchemaKey = 'user' - будем создавать не массив
строк а массив ключей === названий редюсеров
- loginForm?: LoginSchema // сделаем необязательным -  будем добавлять его асинхронно с помощью reducerManager --
// Асинхронные редюсеры (их удаляем из rootReducers в store.ts - ни не обязательны)
- экспортируем тип ReduxStoreWithManager из паблик апи
------------------------------------------------------------------------------------------------------------------------------
49 видео:
- articleDetails?: ArticleDetailsSchema // необязательным поле делаем - редюсер будет асинхронным - потом подключаем редюсер с помощью DynamicModuleLoader
на UI - в ArticleDetails

 */
