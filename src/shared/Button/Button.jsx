

import styles from "./Button.module.css";

export default function Button({ onClick, type = "button" ,text}) {
    return (
        <button className={styles.button} onClick={onClick} type={type}>
            {text}
        </button>
    );
}