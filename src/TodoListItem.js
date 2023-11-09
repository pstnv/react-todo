import React from "react";
import style from "./TodoListItem.module.css";

function TodoListItem({ id, title, onRemoveTodo }) {
    return (
        <li className={style.ListItem}>
            {title}
            <button onClick={() => onRemoveTodo(id)} className={style.button}>
                Remove
            </button>
        </li>
    );
}
export default TodoListItem;
