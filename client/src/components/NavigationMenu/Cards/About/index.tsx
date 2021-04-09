import { forwardRef } from 'react'
import styles from './styles.module.css'


const CompanyCard = forwardRef<HTMLElement>((props, companyRef) => (
    <section className={styles.card} ref={companyRef}>
        <div className={styles.mainActions}>
            <ul className={styles.actions}>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>About Orbitcluster</p>
                        <p>The who and why</p>
                    </div>
                </li>
            </ul>
            <ul className={styles.actions}>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Blog</p>
                        <p>Some light reading</p>
                    </div>
                </li>
                <li className={styles.action}>
                    <div className={styles.icons}></div>
                    <div className={styles.description}>
                        <p>Credits</p>
                        <p>What made this site possible</p>
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
