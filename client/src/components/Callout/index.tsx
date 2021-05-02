import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

interface Props {
    title: string,
    content: string | number | Date,
    units?: string,
    link?: string,
}

const Callout: React.FC<Props> = (props) => {
    return (
        <div className={styles.callout}>
            <span className={styles.title}>{props.title}</span>
            <div className={styles.content}>
                {props.link
                    ? (
                        <Link to={props.link}>
                            <span>{props.content}</span>
                        </Link>
                    )
                    : <span>{props.content}</span>
                }
                <span>

                </span>
                {props.units &&
                    <span className={styles.units}>{props.units}</span>
                }
            </div>
        </div>
    )
};

export default Callout;
