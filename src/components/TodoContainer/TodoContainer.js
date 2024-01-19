import { useState, useEffect, useRef } from "react";
import style from "./TodoContainer.module.css";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SortOptionsList from "../SortOptionsList/SortOptionsList";
const urlAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
const tokenAPI = process.env.REACT_APP_AIRTABLE_API_TOKEN;
const sortOptions = [
    { name: "Newest", option: "new" },
    { name: "Oldest", option: "old" },
    { name: "Recently Edited", option: "edit" },
    { name: "A to Z", option: "asc" },
    { name: "Z to A", option: "desc" },
];
const defaultSorting = "edit";

function TodoContainer() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState(defaultSorting);
    const [updatingTodoId, setUpdatingTodoId] = useState(null);
    const [updatingTodoTitle, setUpdatingTodoTitle] = useState("");
    const prevTodoList = useRef(todoList);

    useEffect(() => {
        prevTodoList.current = todoList;
    });

    const fetchData = async (params, id = "") => {
        const options = {
            ...params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAPI}`,
            },
        };
        const url = `${urlAPI}/${id}`;
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
            const data = await fetchData(params);
            const todos = data.records.map((record) => {
                const {
                    fields: { title, edited, completed },
                    id,
                    createdTime,
                } = record;
                return {
                    id,
                    title,
                    edited: edited || createdTime,
                    completed: completed ?? false,
                    createdTime,
                };
            });
            setTodoList(todos);
            setIsLoading(false);
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        const currentTodoList = [...todoList];

        const sortList = {
            asc(list) {
                list.sort((objectA, objectB) =>
                    objectA.title.localeCompare(objectB.title)
                );
            },
            desc(list) {
                list.sort((objectA, objectB) =>
                    objectB.title.localeCompare(objectA.title)
                );
            },
            edit(list) {
                list.sort(
                    (objectA, objectB) =>
                        new Date(objectB.edited) - new Date(objectA.edited)
                );
            },
            new(list) {
                list.sort(
                    (objectA, objectB) =>
                        new Date(objectB.createdTime) -
                        new Date(objectA.createdTime)
                );
            },
            old(list) {
                list.sort(
                    (objectA, objectB) =>
                        new Date(objectA.createdTime) -
                        new Date(objectB.createdTime)
                );
            },
        };
        sortList[sortOption](currentTodoList);
        if (
            JSON.stringify(currentTodoList) ===
            JSON.stringify(prevTodoList.current)
        ) {
            return;
        }
        setTodoList(currentTodoList);
    }, [sortOption, todoList]);

    const addTodo = async (title) => {
        if (!title) {
            return;
        }
        const todo = {
            fields: {
                title,
                edited: new Date().toISOString(),
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
            completed: data.fields.completed ?? false,
            edited: data.fields.edited,
            createdTime: data.createdTime,
        };        
        setTodoList([...todoList, newTodo]);
        console.log(todoList)
    };

    async function removeTodo(id) {
        if (id === updatingTodoId) {
            setUpdatingTodoId(null);
            setUpdatingTodoTitle("");
        }
        const params = {
            method: "DELETE",
        };
        fetchData(params, id);
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    function editTodo(id, title) {
        setUpdatingTodoId(id);
        setUpdatingTodoTitle(title);
    }

    async function updateTodo(title) {
        setUpdatingTodoId(null);
        setUpdatingTodoTitle("");
        if (!title) {
            return;
        }
        const sentTodo = {
            fields: {
                title,
                edited: new Date().toISOString(),
            },
        };
        const params = {
            method: "PATCH",
            body: JSON.stringify(sentTodo),
        };
        const data = await fetchData(params, updatingTodoId);
        const editedTodo = {
            id: data.id,
            title: data.fields.title,
            completed: data.fields.completed,
            edited: data.fields.edited,
            createdTime: data.createdTime,
        };
        const editedTodoList = todoList.map((todo) => {
            return todo.id === updatingTodoId ? editedTodo : todo;
        });
        setTodoList(editedTodoList);
    }

    async function completeTodo(id) {
        const todo = todoList.find(item => item.id === id);
        const sentTodo = {
            fields: {
                completed: !todo.completed
            },
        };
        const params = {
            method: "PATCH",
            body: JSON.stringify(sentTodo),
        };
        const data = await fetchData(params, id);
        const editedTodo = {
            id: data.id,
            title: data.fields.title,
            completed: data.fields.completed,
            edited: data.fields.edited,
            createdTime: data.createdTime,
        };
        const editedTodoList = todoList.map((todo) => {
            return todo.id === id ? editedTodo : todo;
        });
        setTodoList(editedTodoList);
    }

    function sortTodoList (option = defaultSorting) {
        setSortOption(option);
    }

    return (
        <div className={style.container}>
            <h1 className={style.header}>Todo List</h1>
            <AddTodoForm
                onAddTodo={addTodo}
                updatingTodoTitle={updatingTodoTitle}
                onUpdateTodo={updateTodo}
            />
            {!isLoading && (
                <SortOptionsList
                    sortOptions={sortOptions}
                    onSortTodoList={sortTodoList}
                />
            )}
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <TodoList
                    todoList={todoList}
                    onRemoveTodo={removeTodo}
                        onEditTodo={editTodo}
                        onCompleteTodo={completeTodo}
                />
            )}
        </div>
    );
}

export default TodoContainer;
