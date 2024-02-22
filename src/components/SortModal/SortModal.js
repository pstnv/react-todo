import PropTypes from "prop-types";
import Modal from "../UI/Modal/Modal";
import SortOptionsList from "../SortOptionsList/SortOptionsList";
import Button from "../UI/Button/Button";
import style from './Sortmodal.module.css';
const animated = true;

function SortModal({
    sortOptions,
    selectedSorting,
    onSortTodoList,
    visible,
    onHideModal,
}) {
    return (
        <Modal
            visible={visible}
            onHideModal={onHideModal}
            animated={animated}
            propStyle={style.modal}
        >
            <SortOptionsList
                sortOptions={sortOptions}
                selectedSorting={selectedSorting}
                onSortTodoList={onSortTodoList}
            />
            <Button styles={style.btn} onClickHandler={onHideModal}>
                Close
            </Button>
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

export default SortModal;
