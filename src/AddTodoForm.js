import React from "react";

function AddTodoForm(props) {
    function handleAddTodo(e) {
        e.preventDefault();
        const form = e.target;
        const title = form["title"];
        const todoTitle = title.value;
        console.log(todoTitle);
        props.onAddTodo(todoTitle);
        form.reset();
    }

    return (
        <form onSubmit={ handleAddTodo }>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" name="title"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;