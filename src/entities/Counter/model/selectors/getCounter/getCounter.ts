// Селекторы называют с get или select
import type { StateSchema } from 'app/providers/StoreProvider';

// возвращает весь стейт "счетчика" - state.counter
export const getCounter = (state: StateSchema) => state.counter;

/*
- Проверяем что импортировали StateSchema не из внутренностей а из паблик апи - добавим StateSchema у себя в StoreProvider в паблик...

- Если импортируем тип то приписываем type при импорте + в FSD типы иногда можно импортировать из вышестоящего слайса...
 */
