import React from "react";
import {Link} from 'react-router-dom';
import styles from './Navbar.module.scss'

interface  NavbarProps {

}

export function Navbar(props: NavbarProps) {
  return (<div className={styles.bar}>
    <Link className={styles.barTitle} to="/">Barry<br/>McAndrews</Link>
    <span className={styles.separator}>|</span>
    <Link className={styles.barItem} to="/">Home</Link>
    {/*<Link className={styles.barItem} to="/">Portfolio</Link>*/}
    {/*<Link className={styles.barItem} to="/">About</Link>*/}
  </div>)
}
