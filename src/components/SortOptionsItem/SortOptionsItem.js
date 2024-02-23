import PropTypes from "prop-types";
import style from "./SortOptionsItem.module.css";

function SortOptionsItem({ isSelected, name, option, onSortTodoList }) {
    const styles = [style.li];
    if (isSelected) {
        styles.push(style.selected);
    }
    return (
        <li className={styles.join(" ")} onClick={() => onSortTodoList(option)}>
            {name}
        </li>
    );
}

SortOptionsItem.propTypes = {
    isSelected: PropTypes.bool,
    name: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    onSortTodoList: PropTypes.func.isRequired,
};
SortOptionsItem.defaultProps = {
    isSelected: false,
};

export default SortOptionsItem;
