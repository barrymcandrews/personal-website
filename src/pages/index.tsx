import React from 'react';
import classes from './Home.module.scss';
import AboutMeSection from '../components/sections/AboutMeSection/AboutMeSection';
import MailSection from '../components/sections/MailSection';
import LinksSection from '../components/sections/LinksSection';
import ResumeSection from '../components/sections/ResumeSection';
import ResponsiveImage from '../components/elements/ResponsiveImage';
// import AppsSection from '../components/sections/AppsSection';

function Home() {
  return (
    <div className={classes.Home}>
      <div className={classes.container}>
        <header className={classes.header}>
          <div>
            <ResponsiveImage
              priority
              alt='Barry McAndrews'
              className={classes.image}
              height={130}
              image='barry'
              width={130}
            />
          </div>
          <div className={classes.headerText}>
            <h1>Barry</h1>
            <br />
            <h1>McAndrews</h1>
            <br />
            <h2 className={classes.subtitle}>Software Engineer</h2>
          </div>
        </header>

        <ResumeSection />

        <LinksSection />

        <AboutMeSection />

        {/* Hidden until launch; app and support pages remain accessible directly. */}
        {/* <AppsSection /> */}

        {/*<CertificationSection />*/}

        <MailSection />
      </div>
    </div>
  );
}

export default Home;
