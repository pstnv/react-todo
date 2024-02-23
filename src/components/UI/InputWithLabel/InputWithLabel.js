import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";

function InputWithLabel({
    children,
    type,
    id,
    recordTitle,
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
                className={style.input}
                id={id}
                onChange={handleTitleChange}
                ref={inputRef}
                type={type}
                value={recordTitle}
            />
        </>
    );
}

InputWithLabel.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    recordTitle: PropTypes.string,
    handleTitleChange: PropTypes.func.isRequired,
};
InputWithLabel.defaultProps = {
    type: "text",
    children: "",
};
export default InputWithLabel;
