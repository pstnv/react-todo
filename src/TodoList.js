import React from "react";
import style from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul className={style.list}>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    {...todo}
                    onRemoveTodo={onRemoveTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;
