import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../store.ts";
import {increment, selectCount} from "./counterSlice.ts";


interface CounterProps {
    incrementValue: number
}


export const Counter: FC<CounterProps> = ({incrementValue}) => {
    const count = useAppSelector(selectCount)
    const dispatch = useAppDispatch()

    const handleIncrement = () => {
        dispatch(increment(incrementValue))
    }

    return (
        <>
            <p>count: {count}</p>
            <button onClick={handleIncrement}>+</button>
        </>
    )
}

