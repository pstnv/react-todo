function InputWithLabel({ label, todoTitle, handleTitleChange }) {
    return (
        <>
            <label htmlFor="todoTitle">{label}</label>
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
