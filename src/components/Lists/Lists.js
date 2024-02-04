import ListsItem from "../ListsItem/ListsItem";
import style from './Lists.module.css';

function Lists({ lists, onRenameList, onDeleteList }) {
    return (
        <ul className={style.list}>
            {lists.map((list) => (
                <ListsItem
                    key={list.id}
                    {...list}
                    onRenameList={onRenameList}
                    onDeleteList={onDeleteList}
                />
            ))}
        </ul>
    );
}

export default Lists;
