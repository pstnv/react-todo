import PropTypes from "prop-types";

function Button({ children, onClickHandler, params, styles, type }) {
    const onBtnClick = (params) => (event) => {
        event.stopPropagation();
        if (onClickHandler && typeof onClickHandler === "function") {
            onClickHandler(...params);
        }
    };
    return (
        <button
            type={type}
            className={styles}
            onClick={(e) => onBtnClick(params)(e)}
        >
            {children}
        </button>
    );
}

Button.PropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
        PropTypes.number,
    ]),
    onClickHandler: PropTypes.func,
    params: PropTypes.array,
    styles: PropTypes.object,
    type: PropTypes.string,
};
Button.defaultProps = {
    params: [],
    styles: {},
    type: "button",
};

export default Button;
