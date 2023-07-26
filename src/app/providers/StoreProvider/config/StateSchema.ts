// Типизируем store всего Арр

import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';

export interface StateSchema {
    // стейты конкретных сущностей
    counter: CounterSchema;
    user: UserSchema
    loginForm: LoginSchema
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
 */
