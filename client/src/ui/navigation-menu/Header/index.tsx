import { useEffect, useRef, useState } from 'react';

import MenuContainer from '../MenuContainer';

type NavOption = 'database' | 'visualizations' | 'about';

const Header = () => {
    const [selectedNavOption, setSelectedNavOption] = useState<NavOption | null>(null);
    const [selectedNavOptionPosition, setSelectedNavOptionPosition] = useState<{ x: number }>({ x: 0 });

    const database = useRef<HTMLParagraphElement>(null);
    const visualizations = useRef<HTMLParagraphElement>(null);
    const about = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const resizeHandler = () => {
            if (selectedNavOption !== null || selectedNavOptionPosition.x !== 0) {
                setSelectedNavOptionPosition({ x: 0 });
                setSelectedNavOption(null);
            }
        }
        document.addEventListener('resize', resizeHandler);

        return () => document.removeEventListener('resize', resizeHandler);
    }, [selectedNavOption, selectedNavOptionPosition.x]);

    const onNavOptionHover = (navItemId: NavOption) => {
        if (selectedNavOption === navItemId) return;

        let navOptionScreenPosition: ClientRect;

        switch (navItemId) {
            case 'database':
                if (database === null || database.current === null) return;
                navOptionScreenPosition = database.current.getBoundingClientRect();
                break;
            case 'visualizations':
                if (visualizations === null || visualizations.current === null) return;
                navOptionScreenPosition = visualizations.current.getBoundingClientRect();
                break;
            case 'about':
                if (about === null || about.current === null) return;
                navOptionScreenPosition = about.current.getBoundingClientRect();
                break;
            default:
                return;
        }

        setSelectedNavOptionPosition({ x: navOptionScreenPosition.left + navOptionScreenPosition.width / 2 });
        setSelectedNavOption(navItemId);
    }

    const onMouseLeave = () => {
        setSelectedNavOption(null);
        setSelectedNavOptionPosition({ x: 0 });
    }

    const onNavOptionClicked = (navItemId: NavOption) => {
        selectedNavOption !== null ? onMouseLeave() : onNavOptionHover(navItemId);
    }

    return (
        <header className="w-full h-70 flex justify-center items-center overflow-hidden">
            <div
                onMouseLeave={onMouseLeave}
                className="w-1/3 h-full"
            >
                <nav className="flex flex-row content-around w-full h-full">
                    <button
                        onMouseEnter={() => onNavOptionHover('database')}
                        onClick={() => onNavOptionClicked('database')}
                        onFocus={() => onNavOptionHover('database')}
                        onTouchStart={() => onNavOptionClicked('database')}
                        className="w-full h-full min-w-90 flex items-center justify-center border-none bg-transparent transition cursor-pointer font-semibold"
                        style={{ zIndex: 10000 }}
                    >
                        <p ref={database}>Database</p>
                    </button>

                    <button
                        onMouseEnter={() => onNavOptionHover('visualizations')}
                        onClick={() => onNavOptionClicked('visualizations')}
                        onFocus={() => onNavOptionHover('visualizations')}
                        onTouchStart={() => onNavOptionClicked('visualizations')}
                        className="w-full h-full min-w-90 flex items-center justify-center border-none bg-transparent transition cursor-pointer font-semibold"
                        style={{ zIndex: 10000 }}
                    >
                        <p ref={visualizations}>Visualizations</p>
                    </button>

                    <button
                        onMouseEnter={() => onNavOptionHover('about')}
                        onClick={() => onNavOptionClicked('about')}
                        onFocus={() => onNavOptionHover('about')}
                        onTouchStart={() => onNavOptionClicked('about')}
                        className="w-full h-full min-w-90 flex items-center justify-center border-none bg-transparent transition cursor-pointer font-semibold"
                        style={{ zIndex: 10000 }}
                    >
                        <p ref={about}>About</p>
                    </button>
                </nav>
                <MenuContainer
                    selectedNavOption={selectedNavOption}
                    selectedNavOptionPosition={selectedNavOptionPosition}
                />
            </div>
        </header>
    )
}

export default Header;
