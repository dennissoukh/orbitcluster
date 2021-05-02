import { useContext } from "react";
import { createContext } from "react";

const satState = { satellites: { scrollY: 0, page: 0 } };

export const PageContext = createContext(satState);

export const PageProvider = (props: any) => {
    return <PageContext.Provider value={satState} {...props}/>;
}

export const usePageStore = () => useContext(PageContext);
