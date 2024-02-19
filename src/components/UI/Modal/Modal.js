import style from "./Modal.module.css";

function Modal({ children, visible, onHideModal }) {
    const modalClasses = [style.modal];
    if (visible) {
        modalClasses.push(style.active);
    }
    return (
        <div className={modalClasses.join(" ")} onClick={onHideModal}>
            <div className={style.modalContent} onClick={(e)=> e.stopPropagation()}>{children}</div>
        </div>
    );
}

export default Modal;
