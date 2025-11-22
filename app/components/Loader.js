import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.cont}>
            <div className={styles.loader}>
                <span className={styles.loader}></span>
            </div>
        </div>
    );
}