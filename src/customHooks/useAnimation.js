import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

export const useIsMounted = () => {
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = false;
        return () => (isMounted.current = true);
    }, []);
    return isMounted.current;
}

export const useSlideModal = (animated, isMounting, visible, modalContainer, modalContent) => {
    useGSAP(() => {
        if (!animated || isMounting) {
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
};