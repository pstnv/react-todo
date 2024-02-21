import { useRef, useEffect } from "react";

export default function useIsMounted() {
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = false;
        return () => (isMounted.current = true);
    }, []);
    return isMounted.current;
}
