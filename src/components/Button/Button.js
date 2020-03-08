import React from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";


export function Button(props) {
    return (
      <a className={styles.btn} href={props.href}>{props.children}</a>
    );
}

export function LinkButton(props) {
    return (
      <Link className={styles.btn} to={props.to}>{props.children}</Link>
    );
}
