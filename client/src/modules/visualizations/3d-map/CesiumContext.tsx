import { createContext } from 'react';

export const state = {
    viewer: '',
    setInstance: (ref: any) => {
        state.viewer = ref;
    }
};

const CesiumContext = createContext(state);

export default CesiumContext;
