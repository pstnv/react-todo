import { useState, useEffect } from "react";
import style from "./TodoContainer.module.css";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import SortOptionsList from "../SortOptionsList/SortOptionsList";
const urlAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
const tokenAPI = process.env.REACT_APP_AIRTABLE_API_TOKEN;
const sortOptions = [
    { name: "Newest", option: "new" },
    { name: "Oldest", option: "old" },
    { name: "A to Z", option: "asc" },
    { name: "Z to A", option: "desc" },
];
const sortList = {
    asc(list) {
        list.sort((objectA, objectB) => {
            if (objectA.title > objectB.title) {
                return 1;
            } else if (objectA.title === objectB.title) {
                return 0;
            } else {
                return -1;
            }
        });
    },
    desc(list) {
        list.sort((objectA, objectB) => {
            if (objectA.title > objectB.title) {
                return -1;
            } else if (objectA.title === objectB.title) {
                return 0;
            } else {
                return 1;
            }
        });
    },
    new(list) {
        list.sort((objectA, objectB) => {
            if (objectA.createdTime < objectB.createdTime) {
                return 1;
            }
            if (objectA.createdTime > objectB.createdTime) {
                return -1;
            }
            return 0;
        });
    },
    old(list) {
        list.sort((objectA, objectB) => {
            if (objectA.createdTime < objectB.createdTime) {
                return -1;
            }
            if (objectA.createdTime > objectB.createdTime) {
                return 1;
            }
            return 0;
        });
    },
};

function TodoContainer() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState("new");

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
                return {
                    id: record.id,
                    title: record.fields.title,
                    createdTime: record.createdTime,
                };
            });
            if (sortOption) {
                sortList[sortOption](todos);
            }
            setTodoList(todos);
            setIsLoading(false);
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        const todos = [...todoList];
        if (!todos.length || !sortOption) {
            return;
        }
        sortList[sortOption](todos);
        setTodoList(todos);
    }, [sortOption, todoList.length]);

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
            createdTime: data.createdTime,
        };
        setTodoList([...todoList, newTodo]);
    };

    async function removeTodo(id) {
        const params = {
            method: "DELETE",
        };
        fetchData(params, id);
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    function sortTodoList(option) {
        setSortOption(option);
    }

    return (
        <div className={style.container}>
            <h1 className={style.header}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {!isLoading && (
                <SortOptionsList
                    sortOptions={sortOptions}
                    onSortTodoList={sortTodoList}
                />
            )}
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </div>
    );
}

export default TodoContainer;
