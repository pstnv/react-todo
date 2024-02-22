import { useRef } from "react";
import style from "./Modal.module.css";
import { useSlideModal, useIsMounted } from "../../../customHooks/useAnimation";

function Modal({ children, visible, onHideModal, animated, propStyle='' }) {
    const modalContainer = useRef();
    const modalContent = useRef();
    const modalClasses = [style.modal, propStyle];

    const isMounting = useIsMounted();

    useSlideModal(animated, isMounting, visible, modalContainer, modalContent);
    return (
        <div
            ref={modalContainer}
            className={modalClasses.join(" ")}
            onClick={onHideModal}
        >
            <div
                ref={modalContent}
                className={style.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
