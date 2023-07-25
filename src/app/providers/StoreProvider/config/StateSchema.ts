// Типизируем store всего Арр

import { CounterSchema } from 'entities/Counter';

export interface StateSchema {
    // стейт конкретных сущностей
    counter: CounterSchema;
}

/*
- Все участки стеита  будем называть с приставкои Schema - данные которые хранятся в стейте

- 3) StateSchema - состоит из кусочков стейта что объявлена и типизирована в папке конкретной сущности в model -- types
- 4) импортируем кусочек стейта из паблик_апи - добавляем в паблик_апи сущности Counter: редюсер, тип и сам счётчик Counter, CounterSchema, counterReducer
 */
