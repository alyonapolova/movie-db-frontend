import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";


interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0,
}


export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number> ) => {
            state.count = state.count + action.payload;
        }
    }
})

export const selectCount = (state: RootState) => state.counter.count;


export const {increment} = counterSlice.actions;
