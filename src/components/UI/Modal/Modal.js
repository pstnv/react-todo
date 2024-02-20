import style from "./Modal.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function Modal({ children, visible, onHideModal, animated }) {
    const modalContent = useRef();
    const modalClasses = [style.modal];
    if (visible) {
        modalClasses.push(style.active);
    }
    useGSAP(
        () => {
            if (!animated) {
                return;
            }
            if (!visible) {
                return;
            }
            gsap.from(modalContent.current, {
                y: 400,
            });
            gsap.to(modalContent.current, {
                y: 0,
                delay: 1,
                duration: 2,
                ease: "elastic",
            });
        },
        { dependencies: [visible], revertOnUpdate:true}
    );
    return (
        <div className={modalClasses.join(" ")} onClick={onHideModal}>
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
