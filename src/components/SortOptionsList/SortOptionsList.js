import PropTypes from "prop-types";
import SortOptionsItem from "../SortOptionsItem/SortOptionsItem";
import style from "./SortOptionsList.module.css";

function SortOptionsList({ sortOptions, selectedSorting, onSortTodoList }) {
    return (
        <ul className={style.optionsList}>
            {sortOptions.map(({ name, option }) => {
                const isSelected = option === selectedSorting;
                return (
                    <SortOptionsItem
                        key={name}
                        isSelected={isSelected}
                        name={name}
                        option={option}
                        onSortTodoList={onSortTodoList}
                    />
                );
            })}
        </ul>
    );
}

SortOptionsList.propTypes = {
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            option: PropTypes.string,
        })
    ),
    selectedSorting: PropTypes.string,
    onSortTodoList: PropTypes.func.isRequired,
};
SortOptionsList.defaultProps = {
    sortOptions: [],
};

export default SortOptionsList;
