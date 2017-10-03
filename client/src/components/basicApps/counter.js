import React from 'react';





function Counter({value,
onIncrement,
onDecrement}) {
    return (
    <div>
        <h3>{value}</h3>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
    );
} 



export default Counter;