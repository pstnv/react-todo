import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
const TODOLIST_KEY = "savedTodoList";

function App() {
    const savedTodoList = JSON.parse(localStorage.getItem(TODOLIST_KEY)) || [];
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            },
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const todos = data.records.map((record) => {
                return {
                    id: record.id,
                    title: record.fields.title,
                };
            });
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }
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
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </>
    );
}

export default App;
