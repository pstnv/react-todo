import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import style from "./ListsItem.module.css";
import iconEdit from "../../assets/icons/edit.png";
import iconDelete from "../../assets/icons/deleteList.png";

function ListsItem({ id, name, onEditList, onDeleteList }) {
    return (
        <li className={style.listItem}>
            <Link
                to={`/list/${name.toLowerCase()}`}
                state={{ id, name }}
                className={style.link}
            >
                {name}
            </Link>
            <Button
                styles={style.button}
                onClickHandler={onEditList}
                params={[id, name]}
            >
                <img src={iconEdit} alt="edit list" />
            </Button>
            <Button
                styles={style.button}
                onClickHandler={onDeleteList}
                params={[id, name]}
            >
                <img src={iconDelete} alt="remove list" />
            </Button>
        </li>
    );
}

ListsItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onEditList: PropTypes.func.isRequired,
    onDeleteList: PropTypes.func.isRequired,
};
export default ListsItem;
