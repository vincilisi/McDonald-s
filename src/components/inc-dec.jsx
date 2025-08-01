import { useReducer } from "react";


function IncDec() {
    const [state, dispatch] = useReducer(reducer, start);

    const start = { count: 0 };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 };
            case 'decrement':
                return { count: state.count - 1 };
            case 'reset':
                return start;
            default:
                return state;
        };
    }
    return (
        <>
            <div>
                <h1>{state.count}</h1>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            </div>
        </>
    );
}

export default IncDec