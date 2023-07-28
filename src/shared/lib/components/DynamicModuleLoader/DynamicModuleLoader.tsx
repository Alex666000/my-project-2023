import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

// Чтобы принимать в DynamicModuleLoader ни 1 редюсер а могли много - массив редюсеров...
export type ReducersList = {
    [name in StateSchemaKey]?: Reducer; // ключом будет StateSchemaKey - а значением Reducer

}

type ReducersListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean; // если не захотим удалять редюсер при демонтировании компонента - удалять редюсер из корневого редюсере будем если флаг true
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer); // в момент вмонтирования компонента нам надо с помощью reducerManager - редюсер необходимо добавить
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey); // При демонтировании компонента редюсер удаляем

                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};

/*
- removeAfterUnmount?: boolean; // если не захотим удалять редюсер при демонтировании компонента - удалять редюсер из корневого редюсере будем если флаг true
при открытии модалки редюсер проинициализируется, а при закрытии модалки редюсер не уничтожется

 */
