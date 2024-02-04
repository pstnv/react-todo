import Button from "../Button/Button";
import iconAddList from "../../assets/icons/add.png";
import style from './Footer.module.css';

function Footer({addList}) {
    return (
        <footer className={style.footer}>
            <Button onClickHandler={addList} styles={style.button}>
                <img src={iconAddList} alt="add list" />
            </Button>
        </footer>
    );
}

export default Footer;
