import React from 'react';
import ResponsiveImage from '../elements/ResponsiveImage';
import Link from 'next/link';
import classes from './Apps.module.scss';

export default function AfterframeCard() {
  return (
    <Link className={classes.card} href='/afterframe'>
      <ResponsiveImage
        alt=''
        className={classes.icon}
        height={100}
        image='afterframe'
        width={100}
      />
      <div className={classes.content}>
        <h3>Afterframe</h3>
        <p>Organize film photos into rolls, manage metadata, and search your collection.</p>
        <p className={classes.availability}>For iOS</p>
        <span className={classes.link}>Explore Afterframe ›</span>
      </div>
    </Link>
  );
}
