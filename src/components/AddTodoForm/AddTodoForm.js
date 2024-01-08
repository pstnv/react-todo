import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import style from "./AddTodoForm.module.css";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

function AddTodoForm({
    onAddTodo,
    isUpdating,
    updatingTodoTitle,
    onUpdateTodo,
}) {
    const [todoTitle, setTodoTitle] = useState("");
    const [isEditing, setIsEditing] = useState(true);

    function handleTitleChange(e) {
        if (isEditing) {
            setIsEditing(false);
        }
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        setIsEditing(true);
        isUpdating ? onUpdateTodo(todoTitle) : onAddTodo(todoTitle);
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo} className={style.form}>
            <InputWithLabel
                id="todoTitle"
                todoTitle={isEditing ? updatingTodoTitle : todoTitle}
                handleTitleChange={handleTitleChange}
                // placeholder={isUpdating ? updatingTodoTitle : ""}
            >
                Title
            </InputWithLabel>
            <button type="submit" className={style.btn}>
                Add
            </button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
