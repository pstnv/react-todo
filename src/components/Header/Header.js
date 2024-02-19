import Button from "../UI/Button/Button";
import iconSort from "../../assets/icons/sort.png";
import style from "./Header.module.css";

function Header({ onShowModal, children, styles: propStyles }) {
    return (
        <header className={[propStyles, style.header].join(" ")}>
            {children}
            <Button styles={style.button} onClickHandler={onShowModal}>
                <img src={iconSort} alt="sort todo" />
            </Button>
        </header>
    );
}

export default Header;
