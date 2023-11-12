import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import style from "./AddTodoForm.module.css";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");
    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo} className={style.form}>
            <InputWithLabel
                id="todoTitle"
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
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
