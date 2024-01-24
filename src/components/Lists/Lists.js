import ListsItem from "../ListsItem/ListsItem";

function Lists({ lists, onRenameList, onDeleteList }) {
    return (
        <ul>
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
