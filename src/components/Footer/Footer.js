import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import iconAdd from "../../assets/icons/add.png";
import style from "./Footer.module.css";

function Footer({ onClickHandler }) {
    return (
        <footer className={style.footer}>
            <Button onClickHandler={onClickHandler} styles={style.button}>
                <img src={iconAdd} alt="add record" />
            </Button>
        </footer>
    );
}

Footer.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
};

export default Footer;
