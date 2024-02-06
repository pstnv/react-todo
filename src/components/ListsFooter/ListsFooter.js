import PropTypes from "prop-types";
import Button from "../Button/Button";
import iconAddList from "../../assets/icons/add.png";
import style from "./ListsFooter.module.css";

function ListsFooter({ addList }) {
    return (
        <footer className={style.footer}>
            <Button onClickHandler={addList} styles={style.button}>
                <img src={iconAddList} alt="add list" />
            </Button>
        </footer>
    );
}

ListsFooter.propTypes = {
    addList: PropTypes.func.isRequired,
};

export default ListsFooter;
