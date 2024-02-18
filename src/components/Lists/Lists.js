import PropTypes from "prop-types";
import ListsItem from "../ListsItem/ListsItem";
import style from "./Lists.module.css";

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

Lists.propTypes = {
    lists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    onRenameList: PropTypes.func.isRequired,
    onDeleteList: PropTypes.func.isRequired,
};
Lists.defaultProps = {
    lists: [],
};

export default Lists;
