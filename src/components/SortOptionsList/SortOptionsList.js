import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import style from "./SortOptionsList.module.css";

function SortOptionsList({ sortOptions, selectedSorting, onSortTodoList }) {
    return (
        <div className={style.optionsContainer}>
            {sortOptions.map((sortOption) => {
                const { name, option } = sortOption;
                const isSelected = option === selectedSorting;
                return (
                    <Button
                        key={option}
                        params={[option]}
                        styles={`${style.btn} ${isSelected && style.selected}`}
                        onClickHandler={onSortTodoList}
                    >
                        {name}
                    </Button>
                );
            })}
        </div>
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
