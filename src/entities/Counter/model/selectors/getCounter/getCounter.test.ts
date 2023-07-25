import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('Ожидаем что вернет нужный участок стейта - объект', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});

/*
DeepPartial - не обязательно все поля - позволяет проигнорировать те поля которые не нужны - чаще всего используеся в тестах
 */
