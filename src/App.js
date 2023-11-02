import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
const TODOLIST_KEY = "savedTodoList";

function App() {
    const savedTodoList = JSON.parse(localStorage.getItem(TODOLIST_KEY)) || [];
    const [todoList, setTodoList] = useState(savedTodoList);

    function addTodo(newTodo) {
        setTodoList([...todoList, newTodo]);
    }
    useEffect(() => {
        const todoListJSON = JSON.stringify(todoList);
        localStorage.setItem(TODOLIST_KEY, todoListJSON);
    }, [todoList]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} />
        </div>
    );
}

export default App;
