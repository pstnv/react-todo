import Button from "../Button/Button";
import style from './SortOptionsList.module.css';

function SortOptionsList({ sortOptions, onSortTodoList }) {
    return (
        <div className={style.optionsContainer}>
            Sort:
            {sortOptions.map((sortOption) => {
                return <Button key={sortOption.option} {...sortOption} onSortTodoList={onSortTodoList} />;
            })}
        </div>
    );
}

export default SortOptionsList;
