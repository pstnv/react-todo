import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onEditTodo, onRemoveTodo, onCompleteTodo }) {
    return (
        <ul className={style.list}>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    {...todo}
                    onEditTodo={onEditTodo}
                    onRemoveTodo={onRemoveTodo}
                    onCompleteTodo={onCompleteTodo}
                />
            ))}
        </ul>
    );
}
TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            completed: PropTypes.bool,
        })
    ),
    onEditTodo: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onCompleteTodo: PropTypes.func.isRequired,
};
TodoList.defaultProps = {
    todoList: [],
};

export default TodoList;
