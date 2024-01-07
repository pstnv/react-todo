function Button({ name, option, onSortTodoList }) {
    return <button onClick={() => onSortTodoList(option)}>{name}</button>;
}

export default Button;
