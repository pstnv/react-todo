import React from "react";
import PropTypes from "prop-types";
import style from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem";

function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul className={style.list}>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    {...todo}
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
