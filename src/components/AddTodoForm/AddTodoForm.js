import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../UI/InputWithLabel/InputWithLabel";
import Button from "../UI/Button/Button";
import style from "./AddTodoForm.module.css";
import Modal from "../UI/Modal/Modal";
const animated = false;

function AddTodoForm({
    onAddTodo,
    updatingTodoTitle,
    onUpdateTodo,
    visible,
    onHideInputModal,
}) {
    const [todoTitle, setTodoTitle] = useState("");

    const modalClasses = [style.modal];
    if (visible) {
        modalClasses.push(style.active);
    }
    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        updatingTodoTitle ? onUpdateTodo(todoTitle) : onAddTodo(todoTitle);
        onHideModal();
    }
    useEffect(() => {
        setTodoTitle(updatingTodoTitle);
    }, [updatingTodoTitle]);

    const onHideModal = () => {
        setTodoTitle("");
        onHideInputModal();
    };

    return (
        <Modal
            visible={visible}
            animated={animated}
            propStyle={modalClasses.join(" ")}
            onHideModal={onHideModal}
        >
            <form onSubmit={handleAddTodo} className={style.form}>
                <InputWithLabel
                    id="todoTitle"
                    todoTitle={todoTitle}
                    handleTitleChange={handleTitleChange}
                />
                <Button type="submit" styles={style.btn}>
                    {!todoTitle && updatingTodoTitle ? "Cancel" : "Ok"}
                </Button>
            </form>
        </Modal>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
    updatingTodoTitle: PropTypes.string,
    onUpdateTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
