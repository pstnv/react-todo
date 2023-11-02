import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
const TODOLIST_KEY = "savedTodoList";

function useSemiPersistentState() {
    const savedTodoList = JSON.parse(localStorage.getItem(TODOLIST_KEY)) || [];
    const [todoList, setTodoList] = useState(savedTodoList);

    useEffect(() => {
        const todoListJSON = JSON.stringify(todoList);
        localStorage.setItem(TODOLIST_KEY, todoListJSON);
    }, [todoList]);
    return [todoList, setTodoList];
}

function App() {
    const [todoList, setTodoList] = useSemiPersistentState();
    function addTodo(newTodo) {
        setTodoList([...todoList, newTodo]);
    }
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} />
        </>
    );
}

export default App;
