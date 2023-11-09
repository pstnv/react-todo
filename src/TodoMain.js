import { useState, useEffect } from "react";
import style from "./TodoMain.module.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

function TodoMain() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (params) => {
        const options = {
            ...params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            },
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTodos = async () => {
        const params = {
            method: "GET",
        };
        const data = await fetchData(params);
        const todos = data.records.map((record) => {
            return {
                id: record.id,
                title: record.fields.title,
            };
        });
        setTodoList(todos);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        const todo = {
            fields: {
                title,
            },
        };
        const params = {
            method: "POST",
            body: JSON.stringify(todo),
        };
        const data = await fetchData(params);
        const newTodo = {
            id: data.id,
            title: data.fields.title,
        };
        setTodoList([...todoList, newTodo]);
    };
    function removeTodo(id) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }
    return (
        <div className={style.container}>
            <h1 className={style.header}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </div>
    );
}

export default TodoMain;
