import { forwardRef } from 'react';

import styles from './styles.module.css'

const DevelopersCard = forwardRef<HTMLElement>((props, developersRef) => (
    <section className={styles.card} ref={developersRef}>
        <div>
            <ul className={styles.actions}>
                <li>
                    <span className={styles.title}>Core Features</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Search Database</p>
                        <p>Browse the satellite database</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Pass Predictions</p>
                        <p>Predict satellite passes</p>
                    </div>
                </li>
            </ul>
            <ul className={styles.actions}>
                <li>
                    <span className={styles.title}>Live</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Next Launch</p>
                        <p>Starlink-27 in 13 days</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>2D Map Viz</p>
                        <p>Visualise satellite trajectories</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>3D Map Viz</p>
                        <p>Visualise satellite trajectories</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Star Map</p>
                        <p>View a star map for a location</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
))

export default DevelopersCard
