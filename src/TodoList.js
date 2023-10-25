import React from "react";
import TodoListItem from "./TodoListItem";

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
            {todoList.map(({ id, title }) => <TodoListItem key={ id } todo={ title } />)}
        </ul>
    );
}

export default TodoList;