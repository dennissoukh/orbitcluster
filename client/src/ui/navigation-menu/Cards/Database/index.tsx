import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles.module.sass';

const ProductsCard = forwardRef<HTMLElement>((props: any, productsRef) => (
    <section className={styles.card} ref={productsRef} style={{ width: '900px' }}>
        <div className={styles.cardSection}>
            <ul className={styles.navList}>
                <li>
                    <span className={styles.navTitle}>Satellites</span>
                </li>
                <li className={styles.action}>
                    <Link to={`/satellites`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Satellites</p>
                            <p className={styles.navItemBlurb}>Complete satellite database</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/recent/new`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Recently Launched</p>
                            <p className={styles.navItemBlurb}>Launched within the last month</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/recent/decayed`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Recently Decayed</p>
                            <p className={styles.navItemBlurb}>Decayed within the last month</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        <p className={styles.link}>View all satellite categories</p>
                    </Link>
                </li>
            </ul>
            <ul className={styles.navList}>
                <li>
                    <span className={styles.navTitle}>Objects of Interest</span>
                </li>
                <li className={styles.action}>
                    <Link to={`/categories/brightest`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Brightest</p>
                            <p className={styles.navItemBlurb}>Top 100 brightest satellites</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/categories/starlink`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Starlink</p>
                            <p className={styles.navItemBlurb}>SpaceX Starlink constellation</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/categories/amateur`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Amateur Radio</p>
                            <p className={styles.navItemBlurb}>Radio waves from orbit</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/categories/active`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                            <p className={styles.navItemTitle}>Active</p>
                            <p className={styles.navItemBlurb}>Active satellites</p>
                        </div>
                    </Link>
                </li>
            </ul>
            <ul className={styles.navList}>
                <li>
                    <span className={styles.navTitle}>Other</span>
                </li>
                <li className={styles.action}>
                    <Link to={`/operators`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Operators</p>
                        <p className={styles.navItemBlurb}>Owners and operators</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.action}>
                    <Link to={`/launch-sites`}>
                        <div className={styles.icons}>
                            {/* <IconSatellite/> */}
                        </div>
                        <div className={styles.navItem}>
                        <p className={styles.navItemTitle}>Launch Sites</p>
                        <p className={styles.navItemBlurb}>Orbital launch sites</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    </section>
))

export default ProductsCard
