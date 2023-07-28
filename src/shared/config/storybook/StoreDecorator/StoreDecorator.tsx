import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// Добавляем сюда редюсеры который идет по дефолту - и этот объект передаем в StoreProvider
const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);

/*
- state - нужно чтобы для каждои стори добавлять дефолтное значение стейта
- asyncReducers - 2 аргументом  принимает асинхронные редюсеры - если надо передать асинхронный редюсер для какой-то стори подключаем асинхронно
- - в StoreDecorator по дефолту добавляем profile: profileReducer, чтобы по деефолту он у нас был проинициализирован
 */
