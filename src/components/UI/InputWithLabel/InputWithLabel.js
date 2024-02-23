import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";
import { useEffect, useRef } from "react";

function InputWithLabel({ children, type, id, todoTitle, handleTitleChange }) {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
                ref={inputRef}
                type={type}
                id={id}
                value={todoTitle}
                onChange={handleTitleChange}
                className={style.input}
            />
        </>
    );
}

InputWithLabel.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func.isRequired,
};
InputWithLabel.defaultProps = {
    type: "text",
    children: "",
};
export default InputWithLabel;
