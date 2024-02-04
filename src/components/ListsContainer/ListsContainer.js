import { useState, useEffect, useRef } from "react";
import fetchData from "../../utils/fetchData";
import options from "../../utils/options";
import createTableTemplate from "../../utils/createTableTemplate";
import Header from "../Header/Header";
import Lists from "../Lists/Lists";
import style from "./ListsContainer.module.css";
import ListsFooter from "../ListsFooter/ListsFooter";

const urlTablesAPI = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;
const urlSingleBaseAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

function ListsContainer() {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const prevLists = useRef(lists);
    useEffect(() => {
        prevLists.current = lists;
    });

    useEffect(() => {
        async function showLists() {
            const data = await fetchData(urlTablesAPI, options.get);
            const tables = data.tables.map(({ id, name, description }) => {
                return {
                    id,
                    name,
                    description,
                };
            });
            setLists(tables);
            setIsLoading(false);
        }
        showLists();
    }, []);

    useEffect(() => {
        const activeLists = lists.filter(
            (list) => list.name !== list.id && list.description !== "deleted"
        );
        if (JSON.stringify(activeLists) === JSON.stringify(prevLists.current)) {
            return;
        }
        setLists(activeLists);
    }, [lists]);

    async function addList() {
        const tableName = prompt("Enter new list name.");
        if (!tableName) {
            return;
        }
        const tableTemplate = createTableTemplate(tableName);
        const data = await fetchData(urlTablesAPI, options.post(tableTemplate));
        if (!data) {
            return;
        }
        const newList = {
            id: data.id,
            name: data.name,
            description: data.description,
        };
        setLists([...lists, newList]);
    }

    async function renameList(id, title) {
        const editedList = {
            name: title,
        };
        const data = await fetchData(
            urlTablesAPI,
            options.patch(editedList),
            id
        );
        if (!data) {
            return;
        }
        const updatedLists = lists.map((list) => {
            return list.id === id ? { ...list, name: title } : list;
        });
        setLists(updatedLists);
    }

    async function deleteList(id, name) {
        const listURL = `${urlSingleBaseAPI}/${name}`;
        const data = await fetchData(listURL, options.get);
        const todoList = data.records;

        if (!todoList.length) {
            await hideList();
            return;
        }

        Promise.all(
            todoList.map((todo) => fetchData(listURL, options.delete, todo.id))
        ).then(() => hideList());

        async function hideList() {
            const editedList = {
                name: id,
                description: "deleted",
            };
            const data = await fetchData(
                urlTablesAPI,
                options.patch(editedList),
                id
            );
            if (!data) {
                return;
            }
            const newLists = lists.map((list) => {
                return list.id === id ? { ...list, name: data.name } : list;
            });
            setLists(newLists);
        }
    }

    return (
        <div className={style.container}>
            <Header />
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <>
                    <Lists
                        lists={lists}
                        onRenameList={renameList}
                        onDeleteList={deleteList}
                    />
                    <ListsFooter addList={addList} />
                </>
            )}
        </div>
    );
}

export default ListsContainer;
