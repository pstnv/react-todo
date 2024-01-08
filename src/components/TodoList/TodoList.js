import React from "react";
import PropTypes from "prop-types";
import style from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem";

function TodoList({ todoList, onEditTodo, onRemoveTodo }) {
    return (
        <ul className={style.list}>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    {...todo}
                    onEditTodo={onEditTodo}
                    onRemoveTodo={onRemoveTodo}
                />
            ))}
        </ul>
    );
}
TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
