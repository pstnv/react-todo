import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
const TODOLIST_KEY = "savedTodoList";

function App() {
    const savedTodoList = JSON.parse(localStorage.getItem(TODOLIST_KEY)) || [];
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        todoList: savedTodoList,
                    },
                });
            }, 2000);
        }).then((result) => {
            setTodoList(result.data.todoList);
        });
    }, []);

    useEffect(() => {
        const todoListJSON = JSON.stringify(todoList);
        localStorage.setItem(TODOLIST_KEY, todoListJSON);
    }, [todoList]);

    function addTodo(newTodo) {
        setTodoList([...todoList, newTodo]);
    }
    function removeTodo(id) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
    );
}

export default App;
