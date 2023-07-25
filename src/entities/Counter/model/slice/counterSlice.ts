import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}

const initialState = { value: 0 } as CounterState;

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
    },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;

/*
- Поменяли название с actions на counterActions: export const { actions: counterActions } = counterSlice;

- Также меняем на более осмысленное название у редюсера
 */
