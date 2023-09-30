import React from "react";

const todoList = [
    {
        id: 1,
        title: 'Read textbook'
    },
    {
        id: 2,
        title: 'Watch videos'
    },
    {
        id: 3,
        title: 'Complete assignment'
    }
];


function TodoList() {
    return (
        <ul>
            {todoList.map(({ id, title }) => <li key={id}> {title} </li>)}
        </ul>
    );
}

export default TodoList;