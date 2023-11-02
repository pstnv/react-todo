import React from "react";
import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");
    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        onAddTodo({
            id: Date.now(),
            title: todoTitle,
        });
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
            >
                Title
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
