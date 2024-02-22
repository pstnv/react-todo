import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";

function InputWithLabel({
    children,
    type,
    id,
    todoTitle,
    handleTitleChange,
}) {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
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
