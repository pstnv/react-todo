import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import iconEdit from "../../assets/icons/edit.png";
import iconDelete from "../../assets/icons/deleteItem.png";
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
    const handleChange = () => {
        setValue(!value);
        onCompleteTodo(id);
    };
    return (
        <li
            className={`${style.listItem} ${value && style.completed}`}
            onClick={handleChange}
        >
            <span>{title}</span>
            <Button
                onClickHandler={onEditTodo}
                styles={`${style.button} ${value && style.completed}`}
                params={[id, title]}
            >
                <img src={iconEdit} alt="edit todo" />
            </Button>
            <Button
                onClickHandler={onRemoveTodo}
                styles={style.button}
                params={[id]}
            >
                <img src={iconDelete} alt="remove todo" />
            </Button>
        </li>
    );
}
TodoListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool,
    onEditTodo: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onCompleteTodo: PropTypes.func.isRequired,
};
TodoListItem.defaultProps = {
    title: "",
    completed: false,
};
export default TodoListItem;
