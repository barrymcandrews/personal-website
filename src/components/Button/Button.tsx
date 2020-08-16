import React, {ReactNode} from "react";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";

export interface ButtonProps {
    to: string,
    children: ReactNode
}

export function AnchorButton(props: ButtonProps) {
    return (
      <a className={styles.btn} href={props.to}>{props.children}</a>
    );
}

export function LinkButton(props: ButtonProps) {
    return (
      <Link className={styles.btn} to={props.to}>{props.children}</Link>
    );
}
