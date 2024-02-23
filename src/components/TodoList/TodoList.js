import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onEditTodo, onRemoveTodo, onCompleteTodo }) {
    return (
        <ul className={style.list}>
            <TransitionGroup>
                {todoList.map((todo) => (
                    <CSSTransition
                        key={todo.id}
                        timeout={200}
                        classNames={{
                            enter: style.itemEnter,
                            enterActive: style.itemEnterActive,
                            exit: style.itemExit,
                            exitActive: style.itemExitActive,
                        }}
                    >
                        <TodoListItem
                            {...todo}
                            onEditTodo={onEditTodo}
                            onRemoveTodo={onRemoveTodo}
                            onCompleteTodo={onCompleteTodo}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
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
