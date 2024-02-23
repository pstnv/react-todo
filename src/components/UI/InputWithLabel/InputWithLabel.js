import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";

function InputWithLabel({
    children,
    handleTitleChange,
    id,
    recordTitle,
    type,
    visible,
}) {
    const inputRef = useRef();
    useEffect(() => {
        visible ? inputRef.current.focus() : inputRef.current.blur();
    }, [visible]);
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
    handleTitleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    recordTitle: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
};
InputWithLabel.defaultProps = {
    children: "",
    type: "text",
    visible: false,
};
export default InputWithLabel;
