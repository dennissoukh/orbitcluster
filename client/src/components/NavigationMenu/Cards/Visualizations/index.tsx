import { forwardRef } from 'react';

import IconCompass from '../../../Icons/Compass';
import IconSearch from '../../../Icons/Search';
import IconRocket from '../../../Icons/Rocket';
import IconMap2 from '../../../Icons/Map2';
import IconGlobe from '../../../Icons/Globe';
import IconGrain from '../../../Icons/Grain';

import styles from '../styles.module.sass';

const DevelopersCard = forwardRef<HTMLElement>((props, developersRef) => (
    <section className={styles.card} ref={developersRef}>
        <div className={styles.cardSection}>
            <ul className={styles.navList}>
                <li>
                    <span className={styles.navTitle}>Core Features</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconSearch/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Search Database</p>
                        <p className={styles.navItemBlurb}>Browse the satellite database</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconCompass/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Pass Predictions</p>
                        <p className={styles.navItemBlurb}>Predict satellite passes</p>
                    </div>
                </li>
            </ul>
            <ul className={styles.navList}>
                <li>
                    <span className={styles.navTitle}>Live</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconRocket/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Next Launch</p>
                        <p className={styles.navItemBlurb}>Starlink-27 in 13 days</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconMap2/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>2D Map Viz</p>
                        <p className={styles.navItemBlurb}>Visualise satellite trajectories</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconGlobe/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>3D Map Viz</p>
                        <p className={styles.navItemBlurb}>Visualise satellite trajectories</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        <IconGrain/>
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Star Map</p>
                        <p className={styles.navItemBlurb}>View a star map for a location</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
))

export default DevelopersCard
