import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";
import Button from "../Button/Button";

function TodoListItem({
    id,
    title,
    completed,
    onEditTodo,
    onRemoveTodo,
    onCompleteTodo,
}) {
    const [value, setValue] = useState(completed);
    const handleChange = () => {
        setValue(!value);
        onCompleteTodo(id);
    };
    return (
        <li className={style.ListItem} onDoubleClick={handleChange}>
            <input type="checkbox" checked={value} onChange={handleChange} />
            {title}
            <Button
                onClickHandler={onEditTodo}
                styles={style.button}
                params={[id, title]}
            >
                Edit
            </Button>
            <Button
                onClickHandler={onRemoveTodo}
                styles={style.button}
                params={[id]}
            >
                Remove
            </Button>
        </li>
    );
}
TodoListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoListItem;
