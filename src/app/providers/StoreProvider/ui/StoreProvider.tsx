import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { useNavigate } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children?: ReactNode; // компонент что оборачиваем в провайдер
    initialState?: DeepPartial<StateSchema>; // чтобы задать не весь стейт а определенные участки которые нужны для тестирования
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>> // добавляем асинхронные редюсеры которые из вне тоже можем задавать
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    const navigate = useNavigate(); // создали и эту функцию передаем аргументом в createReduxStore()

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>, // передаем асинхронные редюсеры в createReduxStore
        navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
/*
Provider - нужен чтобы связать реакт с редаксом

Прокидываем initialState в функцию createReduxStore - теперь при создании стора примем этот аргумент

DeepPartial - какая-то часть... не обязательно все поля - позволяет проигнорировать те поля которые не нужны - чаще всего используеся в тестах

- 35 видео: Добавляем асинхронные редюсеры - рефакторим конфиг StoreProvider:
1) // добавляем асинхронные редюсеры которые из вне тоже можем задавать
2) // передаем асинхронные редюсеры в createReduxStore - но для этого изменим саму createReduxStore и укажим что этот тип ожидаем 2 аргументом
 */
