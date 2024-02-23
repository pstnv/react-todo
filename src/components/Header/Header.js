import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import iconSort from "../../assets/icons/sort.png";
import style from "./Header.module.css";

function Header({ setSortModal, children, propStyles }) {
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

Header.propTypes = {
    setSortModal: PropTypes.func.isRequired,
    children: PropTypes.node,
    propStyles: PropTypes.string,
};
Header.defaultProps = {
    propStyles: "",
};

export default Header;
