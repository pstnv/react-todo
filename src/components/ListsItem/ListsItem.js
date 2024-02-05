import { Link } from "react-router-dom";
import Button from "../Button/Button";
import style from "./ListsItem.module.css";
import iconEdit from "../../assets/icons/edit.png";
import iconDelete from "../../assets/icons/deleteList.png";

function ListsItem({ id, name, onRenameList, onDeleteList }) {
    const onClickEditHandler = () => {
        const newTitle = prompt("Enter new name", name);
        if (!newTitle) {
            return;
        }
        onRenameList(id, newTitle);
    };
    return (
        <li className={style.listItem}>
            <Link to={`/list/${name.toLowerCase()}`} state={{ id, name }} className={style.link}>
                {name}
            </Link>
            <Button styles={style.button} onClickHandler={onClickEditHandler}>
                <img src={iconEdit} alt="edit todo" />
            </Button>
            <Button
                styles={style.button}
                onClickHandler={onDeleteList}
                params={[id, name]}
            >
                <img src={iconDelete} alt="remove todo" />
            </Button>
        </li>
    );
}
export default ListsItem;
