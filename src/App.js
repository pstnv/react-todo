import React from 'react';
import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  return (
      <div>
          <h1 style={{ textAlign: "center" }}>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} />
      </div>
  );
}

export default App;