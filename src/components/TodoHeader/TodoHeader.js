import Button from "../UI/Button/Button";
import iconSort from "../../assets/icons/sort.png";
import style from "./TodoHeader.module.css";

function TodoHeader({ onShowModal, children, styles: propStyles }) {
    return (
        <header className={[propStyles, style.header].join(" ")}>
            {children}
            <Button styles={style.button} onClickHandler={onShowModal}>
                <img src={iconSort} alt="sort todo" />
            </Button>
        </header>
    );
}

export default TodoHeader;
