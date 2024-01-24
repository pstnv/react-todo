import { Link } from "react-router-dom";

function ListsItem({ id, name, onRenameList, onDeleteList }) {
    const onClickHandler = () => {
        const newTitle = prompt("Enter new name", name);
        if (!newTitle) {
            return;
        }
        onRenameList(id, newTitle);
    };
    return (
        <li>
            <Link to={`/list/${id}`} state={{ id, name }}>
                {name}
            </Link>
            <button onClick={onClickHandler}>Rename list</button>
            <button onClick={() => onDeleteList(id, name)}>Delete list</button>
        </li>
    );
}
export default ListsItem;
