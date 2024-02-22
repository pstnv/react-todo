import Button from "../UI/Button/Button";
import iconSort from "../../assets/icons/sort.png";
import style from "./Header.module.css";

function Header({ setSortModal, children, styles: propStyles }) {
    return (
        <header className={[propStyles, style.header].join(" ")}>
            {children}
            <Button
                styles={style.button}
                onClickHandler={() => setSortModal(true)}
            >
                <img src={iconSort} alt="sort todo" />
            </Button>
        </header>
    );
}

export default Header;
