import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import sortList from "../../utils/sortList";
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
    const { id, name: tableName } = useLocation().state ?? {};
    const urlAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${id}`;

    const defaultSorting = JSON.parse(localStorage.getItem(SORT_KEY)) || "edit";

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState(defaultSorting);
    const [updatingTodoId, setUpdatingTodoId] = useState(null);
    const [updatingTodoTitle, setUpdatingTodoTitle] = useState("");

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
        setIsLoading(false);
        setTodoList(todos);
    }, [urlAPI]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const sortedTodoList = useMemo(() => {
        if (isLoading) {
            return todoList;
        }
        const sortedList = sortList(sortOption, todoList);
        return sortedList;
    }, [sortOption, todoList, isLoading]);


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
        if (!data) {
            setIsLoading(true);
            return;
        }
        const newTodo = {
            id: data.id,
            title: data.fields.title,
            completed: data.fields.completed ?? false,
            edited: data.fields.edited,
            createdTime: data.createdTime,
        };
        setTodoList([...todoList, newTodo]);
    };

    async function removeTodo(id) {
        if (id === updatingTodoId) {
            setUpdatingTodoId(null);
            setUpdatingTodoTitle("");
        }
        const res = await fetchData(urlAPI, options.delete, id);
        if (!res) {
            setIsLoading(true);
            return;
        }
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
        if (!data) {
            setIsLoading(true);
            return;
        }
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
        if (!data) {
            setIsLoading(true);
            return;
        }
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
                    selectedSorting={sortOption}
                />
            )}
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <>
                    <TodoList
                        todoList={sortedTodoList}
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
