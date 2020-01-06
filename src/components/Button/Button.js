import React from "react";
import styles from './Button.module.scss'


export default function Button(props) {
    return (
      <a className={styles.btn} href={props.href}>{props.children}</a>
    );
}
