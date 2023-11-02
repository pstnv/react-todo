function InputWithLabel({ children, todoTitle, handleTitleChange }) {
    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            />
        </>
    );
}
export default InputWithLabel;
