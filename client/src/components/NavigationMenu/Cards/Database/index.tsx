import { forwardRef } from 'react';
import styles from './styles.module.css';

const ProductsCard = forwardRef<HTMLElement>((props, productsRef) => (
    <section className={styles.card} ref={productsRef}>
        <div>
            <ul className={styles.actions}>
                <li>
                    <span className={styles.title}>Satellites</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Low Earth</p>
                        <p>1357 satellites</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Medium Earth</p>
                        <p>123 satellites</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Highly Ecliptical</p>
                        <p>321 satellites</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Geostationary</p>
                        <p>545 satellites</p>
                    </div>
                </li>
                <li>
                    <p className={styles.link}>View all satellite categories</p>
                </li>
            </ul>
            <ul className={styles.actions}>
                <li>
                    <span className={styles.title}>Objects of Interest</span>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Launched</p>
                        <p>Launched in the last 30 days</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Decayed</p>
                        <p>Reentered in the last 30 days</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Brightest</p>
                        <p>Visually brighest satellites</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>International Space Station</p>
                        <p>Humanity's home in space</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Amateur Radio</p>
                        <p>Radio waves from orbit</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
))

export default ProductsCard
