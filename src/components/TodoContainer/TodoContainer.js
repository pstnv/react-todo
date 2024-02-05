import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import style from "./TodoContainer.module.css";
import options from "../../utils/options";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SortOptionsList from "../SortOptionsList/SortOptionsList";
import TodoFooter from "../TodoFooter/TodoFooter";
const SORT_KEY = "defaultSorting";

const sortOptions = [
    { name: "Newest", option: "new" },
    { name: "Oldest", option: "old" },
    { name: "Recently Edited", option: "edit" },
    { name: "A to Z", option: "asc" },
    { name: "Z to A", option: "desc" },
];

function TodoContainer() {
    const { name: tableName } = useLocation().state;
    const urlAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

    const defaultSorting = JSON.parse(localStorage.getItem(SORT_KEY)) || "edit";

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState(defaultSorting);
    const [updatingTodoId, setUpdatingTodoId] = useState(null);
    const [updatingTodoTitle, setUpdatingTodoTitle] = useState("");
    const prevTodoList = useRef(todoList);

    useEffect(() => {
        prevTodoList.current = todoList;
    });

    const fetchTodos = useCallback(async () => {
        const data = await fetchData(urlAPI, options.get);
        if (!data) {
            return;
        }
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
    }, [urlAPI]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

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
        const data = await fetchData(urlAPI, options.post(todo));
        let newTodo = {};
        if (!data) {
            newTodo = {
                id: Date.now().toString(),
                title,
                completed: false,
                edited: new Date().toISOString(),
                createdTime: new Date().toISOString(),
            };
        } else {
            newTodo = {
                id: data.id,
                title: data.fields.title,
                completed: data.fields.completed ?? false,
                edited: data.fields.edited,
                createdTime: data.createdTime,
            };
        }
        setTodoList([...todoList, newTodo]);
    };

    async function removeTodo(id) {
        if (id === updatingTodoId) {
            setUpdatingTodoId(null);
            setUpdatingTodoTitle("");
        }
        fetchData(urlAPI, options.delete, id);
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    function editTodo(id, title) {
        setUpdatingTodoId(id);
        setUpdatingTodoTitle(title);
    }

    async function updateTodo(title) {
        setUpdatingTodoTitle("");
        if (!title) {
            setUpdatingTodoId(null);
            return;
        }
        const sentTodo = {
            fields: {
                title,
                edited: new Date().toISOString(),
            },
        };
        const data = await fetchData(
            urlAPI,
            options.patch(sentTodo),
            updatingTodoId
        );
        let editedTodo = {};
        if (!data) {
            const prevTodo = todoList.find(
                (todo) => todo.id === updatingTodoId
            );
            editedTodo = {
                ...prevTodo,
                title,
                edited: sentTodo.fields.edited,
            };
        } else {
            editedTodo = {
                id: data.id,
                title: data.fields.title,
                completed: data.fields.completed,
                edited: data.fields.edited,
                createdTime: data.createdTime,
            };
        }
        const editedTodoList = todoList.map((todo) => {
            return todo.id === updatingTodoId ? editedTodo : todo;
        });
        setTodoList(editedTodoList);
        setUpdatingTodoId(null);
    }

    async function completeTodo(id) {
        const todo = todoList.find((item) => item.id === id);
        const sentTodo = {
            fields: {
                completed: !todo.completed,
            },
        };
        const data = await fetchData(urlAPI, options.patch(sentTodo), id);
        let editedTodo = {};
        if (!data) {
            editedTodo = {
                ...todo,
                completed: !todo.completed,
            };
        } else {
            editedTodo = {
                id: data.id,
                title: data.fields.title,
                completed: data.fields.completed,
                edited: data.fields.edited,
                createdTime: data.createdTime,
            };
        }
        const editedTodoList = todoList.map((todo) => {
            return todo.id === id ? editedTodo : todo;
        });
        setTodoList(editedTodoList);
    }

    function sortTodoList(option = defaultSorting) {
        setSortOption(option);
        localStorage.setItem(SORT_KEY, JSON.stringify(option));
    }

    return (
        <div className={style.container}>
            <h1 className={style.header}>{tableName} </h1>
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
                <>
                    <TodoList
                        todoList={todoList}
                        onRemoveTodo={removeTodo}
                        onEditTodo={editTodo}
                        onCompleteTodo={completeTodo}
                    />
                    <TodoFooter />
                </>
            )}
        </div>
    );
}

export default TodoContainer;
