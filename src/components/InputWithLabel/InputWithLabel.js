import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";

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
                className={style.input}
            />
        </>
    );
}
InputWithLabel.defaultProps = {
    type: "text",
};
InputWithLabel.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func.isRequired,
};
export default InputWithLabel;
