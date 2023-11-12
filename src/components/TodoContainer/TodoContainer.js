import { useState, useEffect } from "react";
import style from "./TodoContainer.module.css";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
const urlAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
const tokenAPI = process.env.REACT_APP_AIRTABLE_API_TOKEN;

function TodoContainer() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (url, params) => {
        const options = {
            ...params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAPI}`,
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

    useEffect(() => {
        const fetchTodos = async () => {
            const params = {
                method: "GET",
            };
            const url = `${urlAPI}?view=Grid%20view`;
            const data = await fetchData(url, params);
            const todos = data.records.map((record) => {
                return {
                    id: record.id,
                    title: record.fields.title,
                };
            });
            setTodoList(todos);
            setIsLoading(false);
        };
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
        const data = await fetchData(urlAPI, params);
        const newTodo = {
            id: data.id,
            title: data.fields.title,
        };
        setTodoList([...todoList, newTodo]);
    };

    async function removeTodo(id) {
        const params = {
            method: "DELETE",
        };
        const url = `${urlAPI}/${id}`;
        fetchData(url, params);
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

export default TodoContainer;
