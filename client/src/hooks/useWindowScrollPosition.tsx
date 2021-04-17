import { useEffect, useState } from "react";

const useWindowScrollPosition: any = (setCondition: boolean): void => {
    const [scrollY, setScroll] = useState((window.history.state && window.history.state.scrollY) || 0);

    useEffect(() => {
        if (setCondition) {
            window.scrollTo(0, window.history.state.scrollY);
        }
    }, [setCondition, scrollY]);

    useEffect(() => {
        return () => {
            setScroll(window.history.state.scrollY);
        }
    }, []);
}

export default useWindowScrollPosition;
