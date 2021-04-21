import React from 'react';
import { useScreenType } from './hooks/useScreenType';
import DesktopLayout from './modules/layouts/DesktopLayout';
import MobileLayout from './modules/layouts/MobileLayout';

const App: React.FC = () => {
    const screenType = useScreenType();

    return (
        <div>
            {screenType === 'desktop' ? (
                    <DesktopLayout/>
                ) : (
                    <MobileLayout/>
                )
            }
        </div>
    );
}

export default App;
