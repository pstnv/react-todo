import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Button from "../Button/Button";
import style from "./AddTodoForm.module.css";

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
            />
            <Button type="submit" styles={style.btn}>
                {!todoTitle && updatingTodoTitle ? "Cancel" : "Ok"}
            </Button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
