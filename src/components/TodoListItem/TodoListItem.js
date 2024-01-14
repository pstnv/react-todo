import React, {useState} from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({
    id,
    title,
    completed,
    onEditTodo,
    onRemoveTodo,
    onCompleteTodo,
}) {
    const [value, setValue] = useState(completed);
    const onBtnClick = (e, callback, ...params) => {
        e.stopPropagation();
        callback(...params);
    };
    const handleChange = () => {
        setValue(!value);
        onCompleteTodo(id)
    }
    return (
        <li className={style.ListItem} onDoubleClick={handleChange}>
            <input type="checkbox" checked={value} onChange={handleChange} />
            {title}
            <button
                onClick={(e) => onBtnClick(e, onEditTodo, id, title)}
                className={style.button}
            >
                Edit
            </button>
            <button
                onClick={(e) => onBtnClick(e, onRemoveTodo, id)}
                className={style.button}
            >
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
