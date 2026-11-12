import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Afterframe() {
  return (
    <AfterframeLayout
      description='An iOS app for organizing film photos into rolls, managing metadata, and searching your collection.'
      page='overview'
      title='Afterframe — Barry McAndrews'
    >
      <div className={classes.overview}>
        <div className={classes.productCopy}>
          <div className={classes.productHeading}>
            <Image
              alt='Afterframe app icon'
              className={classes.icon}
              height={112}
              src='/images/afterframe.png'
              width={112}
            />
            <div>
              <h1>Afterframe</h1>
              <p>Film photography, organized.</p>
            </div>
          </div>
          <p className={classes.introduction}>
            An iOS app for organizing film photos into rolls, managing metadata, and searching your
            collection.
          </p>
          <p className={classes.availability}>
            In development. Not yet available on the App Store.
          </p>
          <nav aria-label='Afterframe' className={classes.links}>
            <Link href='/afterframe/privacy'>Privacy</Link>
            <Link href='/afterframe/support'>Support</Link>
          </nav>
        </div>
        <figure className={classes.screenshot}>
          <div className={classes.screenshotPlaceholder}>
            <strong>In the app</strong>
            <span>Screenshots coming soon</span>
          </div>
          <figcaption>A closer look at Afterframe — coming soon.</figcaption>
        </figure>
      </div>
    </AfterframeLayout>
  );
}
