import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { counterActions } from 'entities/Counter/model/slice/counterSlice';
import { getCounterValue } from 'entities/Counter/model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const { t } = useTranslation();

    // dispatch - экшн закидывает в редюсер
    const dispatch = useDispatch();

    // 1) чтобы данные отрисовать на UI которые изменились благодаря "dispatch" экшена в редюсер +
    // 2) описываем тип для счетчика в папке "types" - потом этот тип добавляем в тип всего Арр в StateSchema
    // 5) После пунктов 3 и 4 сможем тут типизировать:

    // Комментируем (будем писать короче селектор получать):
    // const counterValue = useSelector((state: StateSchema) => state.counter.value);

    // Выносим селектор отдельно в папку "selectors" - там создаем 2 папки getCounter (возвращает весь стейт --- state.counter),
    // getCounterValue вернет уже конкретное значение + создаем тесты для селекторов... -см."selectors"

    const counterValue = useSelector(getCounterValue);
    // 6) Далее добавляем редюсер в store.ts - reducer: {
    //             counter: counterReducer,
    //         },
    // потом отрисуем счетчик например в MainPage

    const increment = () => {
        // 0)
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={decrement}
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
/*
- Весь алгоритм до пункта 0): создаем стор createStore - функцией

- Опишем StoreProvider и обернем все Арр в него

- Типизируем все Арр StateSchema

- Создаем сущность Счетчик - описываем папки - потом пишем UI часть счетчика до логики стейта - далее создаем Слайс + отключаем правило запрещающее иммер.js
в Eslint  'no-param-reassign': 'off',
 */
