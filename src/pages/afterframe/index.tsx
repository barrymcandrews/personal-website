import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Afterframe() {
  const screenshots = [
    {
      label: 'Photos',
      src: '/images/afterframe-photos.png',
      alt: 'Afterframe Photos showing film photos organized into rolls.'
    },
    {
      label: 'Search or Ask',
      src: '/images/afterframe-search.png',
      alt: 'Afterframe Search or Ask showing beach photo search results.'
    }
  ];
  const [selected, setSelected] = useState(0);
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
          <div className={classes.phoneFrame}>
            <Image
              priority
              alt={screenshots[selected].alt}
              className={classes.phoneScreen}
              height={2622}
              id='app-screenshot'
              src={screenshots[selected].src}
              width={1206}
            />
          </div>
          <figcaption>
            <div aria-label='App screenshots' className={classes.screenshotControls}>
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.src}
                  aria-controls='app-screenshot'
                  aria-pressed={selected === index}
                  type='button'
                  onClick={() => setSelected(index)}
                >
                  {screenshot.label}
                </button>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </AfterframeLayout>
  );
}
