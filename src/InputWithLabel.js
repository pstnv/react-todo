import { useEffect, useRef } from "react";

function InputWithLabel({
    children,
    type = "text",
    id,
    todoTitle,
    handleTitleChange,
}) {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
                type={type}
                id={id}
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
        </>
    );
}
export default InputWithLabel;
