import React from "react";
import PropTypes from "prop-types";
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
TodoListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoListItem;
