import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./AddTodoForm.module.css";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Button from "../Button/Button";

function
    AddTodoForm({ onAddTodo, updatingTodoTitle, onUpdateTodo }) {
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        updatingTodoTitle ? onUpdateTodo(todoTitle) : onAddTodo(todoTitle);
        setTodoTitle("");
    }

    useEffect(() => {
        setTodoTitle(updatingTodoTitle);
    }, [updatingTodoTitle]);

    return (
        <form onSubmit={handleAddTodo} className={style.form}>
            <InputWithLabel
                id="todoTitle"
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
            >
                Title
            </InputWithLabel>
            <Button type="submit" className={style.btn}>
                {!todoTitle && updatingTodoTitle ? "Cancel" : "Save"}
            </Button>
            {/* <button type="submit" className={style.btn}>
                {!todoTitle && updatingTodoTitle ? "Cancel" : "Save"}
            </button> */}
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
