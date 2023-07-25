export interface CounterSchema {
    value: number;
}

/*
Все участки стеита будем называть с приставкои Schema - данные которые хранятся в стейте

Потом указываем этот тип для initialState в слайсе - в counterSlice с которым работаем внутри слайса

Добавляем в StateSchema всего Арр - часть нашего стейта счетчика - counter: Counter
 */
