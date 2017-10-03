

import React from 'react';



// purely presentaiton componenet 
//  the <li></li>
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li 
  className="list-group-item todo"
  onClick={onClick}
  style={{
    textDecoration:
      completed ?
        'line-through' :
        'none'
  }}
  >
    {text}
  </li>
)


const TodoList = ({
  todos,
  onTodoClick
}) => {

  if (todos === undefined) {
    return (
      <ul></ul>
    );
  }
  // console.log("Inside TOdoLIST");
  // console.log(todos);
  return (
  <ul className="list-inline">
    {todos.map((todo) => {

      return (
      <Todo
        onClick={() => onTodoClick(todo.id)}
        key={todo.id}
        text={todo.text}
        completed={todo.completed}

        
      />
      )
    }
      
    )}
  </ul>
  )
}

 


export default TodoList;