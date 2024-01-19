import Button from "../Button/Button";
import style from "./SortOptionsList.module.css";

function SortOptionsList({ sortOptions, onSortTodoList }) {
    return (
        <div className={style.optionsContainer}>
            Sort:
            {sortOptions.map((sortOption) => {
                const { name, option } = sortOption;
                return (
                    <Button
                        key={option}
                        params={[option]}
                        onClickHandler={onSortTodoList}
                    >
                        {name}
                    </Button>
                );
            })}
        </div>
    );
}

export default SortOptionsList;
