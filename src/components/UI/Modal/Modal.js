import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import style from "./Modal.module.css";
import useIsMounted from "../../../customHooks/useIsMounted";

function Modal({ children, visible, onHideModal, animated }) {
    const modalContainer = useRef();
    const modalContent = useRef();
    const modalClasses = [style.modal];
    const isMounting = useIsMounted();

    useGSAP(() => {
        if (isMounting) {
            return;
        }
        const modalAnimation = gsap.timeline({ paused: true });
        modalAnimation
            .fromTo(
                modalContainer.current,
                { display: "none", duration: 0 },
                { display: "flex", duration: 0 }
            )
            .fromTo(modalContent.current, { y: 400 }, { y: 0 });
        if (visible) {
            modalAnimation.play();
        } else {
            modalAnimation.reverse(0);
        }
    }, [visible]);
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
