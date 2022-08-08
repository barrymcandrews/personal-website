import React from 'react';
import classes from './AboutMe.module.scss';
import bioPic1 from './bio-1.jpg';
import bioPic3 from './bio-3.jpg';

export default function AboutMeSection() {
  return (
    <section className={classes.aboutMeSection}>
      <div className={classes.imgColumn}>
        <div className={classes.imgCard}>
          <img
            alt='AWS Solutions Architect Associate Badge'
            height={200}
            src={bioPic1}
            width={200}
          />
        </div>
        <div className={classes.imgCard}>
          <img
            alt='AWS Solutions Architect Associate Badge'
            height={250}
            src={bioPic3}
            width={200}
          />
        </div>
      </div>
      <div className={classes.bioCard}>
        <code>$ whoami</code>
        <h3 className={classes.aboutTitle}>About Me</h3>
        <p className={classes.bioParagraph}>
          My name is Barry McAndrews, and I&apos;m an accomplished Software Engineer with a passion
          for the cloud and home automation. Through my work at Vanguard, I&apos;ve gained
          first-hand experience with cutting edge cloud technologies. This experience opened my eyes
          to just how powerful the cloud can be, and it inspired me to achieve my first AWS
          certification.
        </p>
        <p className={classes.bioParagraph}>
          As an engineer, I&apos;m always looking for ways to solve problems, and often find myself
          putting my software (and occasionally hardware) skills to use in home automation projects.
          I find the challenge of making a better product than one you could buy in a store almost
          irresistible.
        </p>
        <p className={classes.bioParagraph}>
          When I&apos;m not working, you can find me taking a walk, working out, or skiing down a
          mountain.
        </p>
      </div>
    </section>
  );
}
