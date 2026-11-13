import React from 'react';
import Link from 'next/link';
import AfterframeCard from '../apps/AfterframeCard';
import classes from '../../pages/Home.module.scss';

export default function AppsSection() {
  return (
    <section aria-labelledby='apps-heading' className={classes.appsSection}>
      <div className={classes.appsHeading}>
        <code>$ goto /apps</code>
        <h3 id='apps-heading'>Apps</h3>
      </div>
      <AfterframeCard />
      <p className={classes.sectionLink}>
        <Link href='/apps'>All apps ›</Link>
      </p>
    </section>
  );
}
