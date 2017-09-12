
import React from 'react';




// presentation componenet
//  presentatiosn should not DISPATCH

let nextTodoId = 0;

const AddTodo = ({
    store
}) => {
  let input;
  return (
    <div>
      <input ref={node => {
          input = node;
      }} />
      <button onClick={() => {
        console.log('dispatching to the store');
        console.log(input.value);
        store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
            });
        input.value = '';
      }}>
          Add Todo
      </button>
    </div>
  )
}




export default AddTodo;