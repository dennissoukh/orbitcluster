import { forwardRef } from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles.module.sass';

const CompanyCard = forwardRef<HTMLElement>((props, companyRef) => (
    <section className={styles.card} ref={companyRef}>
        <div className={styles.cardSection}>
            <ul className={styles.navList}>
                <li className={styles.action}>
                    <Link to={`/`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Dashboard</p>
                            <p className={styles.navItemBlurb}>Return home</p>
                        </div>
                    </Link>
                </li>
            </ul>
            <ul className={styles.navList}>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        {/* <IconBook/> */}
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Blog</p>
                        <p className={styles.navItemBlurb}>Some light reading</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}>
                        {/* <IconAward/> */}
                    </div>
                    <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Credits</p>
                        <p className={styles.navItemBlurb}>What made this site possible</p>
                    </div>
                </li>
            </ul>
        </div>
        <footer className={styles.footer}>
            <h5>From the blog</h5>
            <ul>
                <li>
                    <p>An introduction to SGP4 propagation</p>
                </li>
                <li>
                    <p>A brief overview of JWT auth</p>
                </li>
                <li>
                    <p>StarChart: Procedurally generating star charts for a specific location</p>
                </li>
            </ul>
        </footer>
    </section>
))

export default CompanyCard
