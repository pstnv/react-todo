import React from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ id, title, onEditTodo, onRemoveTodo }) {
    return (
        <li className={style.ListItem}>
            {title}
            <button onClick={() => onEditTodo(id, title)} className={style.button}>
                Edit
            </button>
            <button onClick={() => onRemoveTodo(id)} className={style.button}>
                Remove
            </button>
        </li>
    );
}
TodoListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoListItem;
