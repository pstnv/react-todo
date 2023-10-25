import React from "react";
import { useState } from "react";

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
            title: todoTitle
        });
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
