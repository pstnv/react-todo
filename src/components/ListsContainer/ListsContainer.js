import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import options from "../../utils/options";
import createTableTemplate from "../../utils/createTableTemplate";
import Header from "../Header/Header";
import Lists from "../Lists/Lists";
import style from "./ListsContainer.module.css";
import ListsFooter from "../ListsFooter/ListsFooter";
import SortModal from "../SortModal/SortModal";
import { useFilteredAndSortedLists } from "../../customHooks/useFilteredLists";

const SORT_LISTS_KEY = "listsSorting";

const sortOptions = [
    { name: "A to Z", option: "asc" },
    { name: "Z to A", option: "desc" },
];

const urlTablesAPI = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;
const urlSingleBaseAPI = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

function ListsContainer() {
    const defaultSorting =
        JSON.parse(localStorage.getItem(SORT_LISTS_KEY)) || "asc";

    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSortModal, setSortModal] = useState(false);
    const [sortOption, setSortOption] = useState(defaultSorting);

    useEffect(() => {
        async function showLists() {
            const data = await fetchData(urlTablesAPI, options.get);
            if (!data) {
                return;
            }
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

    const filteredAndSortedLists = useFilteredAndSortedLists(isLoading, lists, sortOption);
    
    async function addList() {
        const tableName = prompt("Enter new list name.");
        if (!tableName) {
            return;
        }
        const tableTemplate = createTableTemplate(tableName);
        const data = await fetchData(urlTablesAPI, options.post(tableTemplate));
        if (!data) {
            setIsLoading(true);
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
            setIsLoading(true);
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
        if (!data) {
            setIsLoading(true);
            return;
        }
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
                setIsLoading(true);
                return;
            }
            const newLists = lists.map((list) => {
                return list.id === id ? { ...list, name: data.name } : list;
            });
            setLists(newLists);
        }
    }

    function sortTodoList(option = defaultSorting) {
        setSortOption(option);
        localStorage.setItem(SORT_LISTS_KEY, JSON.stringify(option));
    }

    return (
        <div className={style.container}>
            <Header styles={style.header} setSortModal={setSortModal}>
                <div>
                    <span className={style.grey}>Your</span>
                    <span>Notes</span>
                </div>
            </Header>
            <SortModal
                sortOptions={sortOptions}
                onSortTodoList={sortTodoList}
                selectedSorting={sortOption}
                visible={isSortModal}
                setSortModal={setSortModal}
            />
            {isLoading ? (
                <p className={style.loading}>Loading...</p>
            ) : (
                <>
                    <Lists
                        lists={filteredAndSortedLists}
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
