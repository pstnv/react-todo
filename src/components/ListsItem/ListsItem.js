import { Link } from "react-router-dom";
import style from './ListsItem.module.css';

function ListsItem({ id, name, onRenameList, onDeleteList }) {
    const onClickHandler = () => {
        const newTitle = prompt("Enter new name", name);
        if (!newTitle) {
            return;
        }
        onRenameList(id, newTitle);
    };
    return (
        <li className={style.listItem}>
            <Link to={`/list/${id}`} state={{ id, name }}>
                {name}
            </Link>
            <button onClick={onClickHandler}>Rename list</button>
            <button onClick={() => onDeleteList(id, name)}>Delete list</button>
        </li>
    );
}
export default ListsItem;
