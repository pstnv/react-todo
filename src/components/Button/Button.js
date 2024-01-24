function Button({
    children,
    onClickHandler,
    params = [],
    styles={},
    type = "button",
}) {
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

export default Button;
