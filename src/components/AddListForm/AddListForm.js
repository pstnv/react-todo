import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../UI/InputWithLabel/InputWithLabel";
import Button from "../UI/Button/Button";
import style from "./AddListForm.module.css";
import Modal from "../UI/Modal/Modal";
const animated = false;

function AddListForm({
    onAddList,
    updatingListTitle,
    onUpdateList,
    visible,
    onHideInputModal,
}) {
    const [listTitle, setListTitle] = useState("");

    const modalClasses = [style.modal];
    if (visible) {
        modalClasses.push(style.active);
    }
    function handleTitleChange(e) {
        const newListTitle = e.target.value;
        setListTitle(newListTitle);
    }
    function handleAddList(e) {
        e.preventDefault();
        updatingListTitle ? onUpdateList(listTitle) : onAddList(listTitle);
        setListTitle("");
        onHideInputModal();
    }
    useEffect(() => {
        setListTitle(updatingListTitle);
    }, [updatingListTitle]);

    return (
        <Modal
            visible={visible}
            animated={animated}
            propStyle={modalClasses.join(" ")}
            onHideModal={onHideInputModal}
        >
            <form onSubmit={handleAddList} className={style.form}>
                <InputWithLabel
                    id="listTitle"
                    todoTitle={listTitle}
                    handleTitleChange={handleTitleChange}
                />
                <Button type="submit" styles={style.btn}>
                    {!listTitle && updatingListTitle ? "Cancel" : "Ok"}
                </Button>
            </form>
        </Modal>
    );
}

AddListForm.propTypes = {
    onAddList: PropTypes.func.isRequired,
    updatingListTitle: PropTypes.string,
    onUpdateList: PropTypes.func.isRequired,
};

export default AddListForm;
