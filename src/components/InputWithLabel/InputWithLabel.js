import { useEffect, useRef } from "react";
import style from './InputWithLabel.module.css';

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
            <label htmlFor={id} >{children}</label>
            <input
                type={type}
                id={id}
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
                className={style.input}
            />
        </>
    );
}
export default InputWithLabel;
