import Button from "../Button/Button";
import style from "./SortOptionsList.module.css";

function SortOptionsList({ sortOptions, onSortTodoList }) {
    return (
        <div className={style.optionsContainer}>
            {sortOptions.map((sortOption) => {
                const { name, option } = sortOption;
                return (
                    <Button
                        key={option}
                        params={[option]}
                        styles={style.btn}
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
    sortOptions: PropTypes.arrayOf(PropTypes.string),
    onSortTodoList: PropTypes.func.isRequired,
};
SortOptionsList.defaultProps = {
    sortOptions: [],
};

export default SortOptionsList;
