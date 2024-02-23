import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../UI/Modal/Modal";
import InputWithLabel from "../UI/InputWithLabel/InputWithLabel";
import Button from "../UI/Button/Button";
import style from "./AddRecordForm.module.css";
const animated = false;

function AddRecordForm({
    id,
    onAddRecord,
    updatingRecordTitle,
    onUpdateRecord,
    visible,
    onHideInputModal,
}) {
    const [recordTitle, setRecordTitle] = useState("");

    const modalClasses = [style.modal];
    if (visible) {
        modalClasses.push(style.active);
    }
    function handleTitleChange(e) {
        const newRecordTitle = e.target.value;
        setRecordTitle(newRecordTitle);
    }
    function handleAddRecord(e) {
        e.preventDefault();
        updatingRecordTitle
            ? onUpdateRecord(recordTitle)
            : onAddRecord(recordTitle);
        onHideModal();
    }
    useEffect(() => {
        setRecordTitle(updatingRecordTitle);
    }, [updatingRecordTitle]);

    const onHideModal = () => {
        setRecordTitle("");
        onHideInputModal();
    };

    return (
        <Modal
            visible={visible}
            animated={animated}
            propStyle={modalClasses.join(" ")}
            onHideModal={onHideModal}
        >
            <form onSubmit={handleAddRecord} className={style.form}>
                <InputWithLabel
                    id={id}
                    recordTitle={recordTitle}
                    handleTitleChange={handleTitleChange}
                />
                <Button type="submit" styles={style.btn}>
                    {!recordTitle && updatingRecordTitle ? "Cancel" : "Ok"}
                </Button>
            </form>
        </Modal>
    );
}

AddRecordForm.propTypes = {
    id: PropTypes.string.isRequired,
    onAddRecord: PropTypes.func.isRequired,
    updatingRecordTitle: PropTypes.string,
    onUpdateRecord: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onHideInputModal: PropTypes.func.isRequired,
};
AddRecordForm.defaultProps = {
    updatingRecordTitle: "",
};

export default AddRecordForm;
