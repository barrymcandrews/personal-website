import React from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";

export interface ButtonProps {
    to: string,
    text: string
}

export function AnchorButton(props: ButtonProps) {
    return (
      <a className={styles.btn} href={props.to} target="_blank" rel="noopener noreferrer">{props.text}</a>
    );
}

export function LinkButton(props: ButtonProps) {
    return (
      <Link className={styles.btn} to={props.to}>{props.text}</Link>
    );
}
