import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useScreenType } from './hooks/useScreenType';
import DesktopLayout from './modules/layouts/DesktopLayout';
import MobileLayout from './modules/layouts/MobileLayout';

const App: React.FC = () => {
    const screenType = useScreenType();

    return (
        <>
            <Router>
                {screenType === 'desktop' ? (
                        <DesktopLayout/>
                    ) : (
                        <MobileLayout/>
                    )
                }
            </Router>
        </>
    );
}

export default App;
