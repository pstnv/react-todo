import React from 'react';
import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  return (
      <div>
          <h1 style={{ textAlign: "center" }}>Todo List</h1>
          <AddTodoForm onAddTodo={setNewTodo} />
          <p>{newTodo}</p>
      <TodoList todoList={todoList} />
      </div>
  );
}

export default App;