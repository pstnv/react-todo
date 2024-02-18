import { Link } from "react-router-dom";
import iconReturn from "../../assets/icons/back.png";
import style from "./TodoFooter.module.css";

function TodoFooter() {
    return (
        <footer className={style.footer}>
            <Link to="/" className={style.button}>
                <img src={iconReturn} alt="return to main page" />
            </Link>
        </footer>
    );
}

export default TodoFooter;
