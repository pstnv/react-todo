import { useRef } from "react";
import PropTypes from "prop-types";
import { useSlideModal, useIsMounted } from "../../../customHooks/useAnimation";
import style from "./Modal.module.css";

function Modal({ children, visible, onHideModal, animated, propStyle = "" }) {
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

Modal.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
    onHideModal: PropTypes.func.isRequired,
    animated: PropTypes.bool,
    propStyle: PropTypes.string,
};
Modal.defaultProps = {
    visible: false,
    animated: false,
    propStyle: "",
};

export default Modal;
