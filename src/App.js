import React from 'react';

const todoList = [
  {
    id: 1,
    title: 'Read textbook'
  },
  {
    id: 2,
    title: 'Watch videos'
  },
  {
    id: 3,
    title: 'Complete assignment'
  }
];

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      <ul>
        { todoList.map(({ id, title }) => <li key={ id }> { title } </li>) }
      </ul>
    </div>
  );
}

export default App;