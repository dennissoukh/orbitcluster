import { Component } from 'react';
import CesiumContext, { state } from './CesiumContext';
import Viewer from './CesiumViewer';

export class Mapper extends Component {
    render() {
        return (
            <>
                <CesiumContext.Provider value={state}>
                    <Viewer/>
                </CesiumContext.Provider>
            </>
        )
    }
}

