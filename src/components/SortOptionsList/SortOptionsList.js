import PropTypes from "prop-types";
import SortOptionsItem from "../SortOptionsItem/SortOptionsItem";
import Modal from "../UI/Modal/Modal";
import style from "./SortOptionsList.module.css";

function SortOptionsList({
    sortOptions,
    selectedSorting,
    onSortTodoList,
    visible,
    onHideModal,
}) {
    return (
        <Modal visible={visible} onHideModal={onHideModal}>
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
        </Modal>
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
