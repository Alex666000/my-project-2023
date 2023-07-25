import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children?: ReactNode; // компонент что оборачиваем в провайдер
    initialState?: DeepPartial<StateSchema>; // чтобы задать не весь стейт а определенные участки которые нужны для тестирования
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
/*
Provider - нужен чтобы связать реакт с редаксом

Прокидываем initialState в функцию createReduxStore - теперь при создании стора примем этот аргумент

DeepPartial - не обязательно все поля - позволяет проигнорировать те поля которые не нужны - чаще всего используеся в тестах
 */
