import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';

import styles from './styles.module.sass';

import DatabaseCard from '../Cards/Database';
import VisualizationCard from '../Cards/Visualizations';
import AboutCard from '../Cards/About';

interface MenuContainerProps {
    selectedNavOption: 'database' | 'visualizations' | 'about' | null,
    selectedNavOptionPosition: { x: number },
}

const MenuContainer = ({ selectedNavOption, selectedNavOptionPosition }: MenuContainerProps) => {
    const database = useRef<HTMLElement | null>(null);
    const visualizations = useRef<HTMLElement>(null);
    const about = useRef<HTMLElement>(null);

    const containerWidth = useMotionValue<number | null>(null);
    const containerHeight = useMotionValue<number | null>(null);

    const [isFirstInteraction, setIsFirstInteraction] = useState(true);

    useEffect(() => {
        if (selectedNavOption !== null)
            setIsFirstInteraction(false);
        else
            setIsFirstInteraction(true);
    }, [selectedNavOption])

    useLayoutEffect(() => {
        if (!selectedNavOption) return;

        let width: number, height: number;

        switch (selectedNavOption) {
            case 'database':
                if (database === null || database.current === null) return;
                width = database.current.clientWidth;
                height = database.current.clientHeight;
                break;
            case 'visualizations':
                if (visualizations === null || visualizations.current === null) return;
                width = visualizations.current.clientWidth;
                height = visualizations.current.clientHeight;
                break;
            case 'about':
                if (about === null || about.current === null) return;
                width = about.current.clientWidth;
                height = about.current.clientHeight;
                break;
            default:
                return;
        }
        containerWidth.set(width);
        containerHeight.set(height);
    }, [selectedNavOption, containerWidth, containerHeight]);

    const cardProps = {
        className: styles.card,
        initial: { opacity: 0, x: isFirstInteraction ? 0 : -70 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: isFirstInteraction ? 0 : -70 },
        transition: { type: 'spring', stiffness: 85, damping: 14 },
    };

    return (
        <AnimatePresence exitBeforeEnter>
            {selectedNavOption !== null && (
                <motion.div
                    className={styles.menuWrapper}
                    style={{ originX: 0.5, originY: 0, transformPerspective: 1000, height: window.innerHeight - 70 }}
                    initial={{ opacity: 0, rotateX: -13 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: -13 }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                >
                    <motion.div
                        className={styles.menuBody}
                        style={{
                            width: containerWidth,
                            height: containerHeight,
                            transition: isFirstInteraction ? '0' : '0.3s'
                        }}
                    >
                        <div
                            className={styles.arrow}
                            style={{ left: selectedNavOptionPosition.x - 6 }}  /* [6 -> half of arrow width] */
                        />

                        <div className={styles.menuContent}>
                            <AnimatePresence>
                                {selectedNavOption === 'database' && (
                                    <motion.div {...cardProps}>
                                        <DatabaseCard ref={database}/>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {selectedNavOption === 'visualizations' && (
                                    <motion.div {...cardProps}>
                                        <VisualizationCard ref={visualizations} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {selectedNavOption === 'about' && (
                                    <motion.div {...cardProps}>
                                        <AboutCard ref={about} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MenuContainer;
