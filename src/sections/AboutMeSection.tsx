import React from 'react';
import classes from '../pages/Home/Home.module.scss';
import Emoji from '../components/Emoji';

export default function AboutMeSection() {
  return (
    <section className='text-center m-20'>
      <code>$ whoami</code>
      <h3 className={classes.aboutTitle}>About Me</h3>
      <p className={classes.bioParagraph}>
        My name is Barry McAndrews, and I&apos;m an accomplished Software Engineer with a passion
        for the cloud and home automation. Through my work at Vanguard, I&apos;ve gained first-hand
        experience with cutting edge cloud technologies. This experience opened my eyes to just how
        powerful the cloud can be, and it inspired me to achieve my first AWS certification.
      </p>
      <p className={classes.bioParagraph}>
        As an engineer, I&apos;m always looking for ways to solve problems, and often find myself
        putting my software (and occasionally hardware) skills to use in home automation projects. I
        find the challenge of making a better product than one you could buy in a store almost
        irresistible.
      </p>
      <p className={classes.bioParagraph}>
        When I&apos;m not working, you can find me taking a walk, working out, or skiing down a
        mountain.
      </p>
      <p>
        <Emoji label='cloud' symbol='☁️' />
        &nbsp;
        <Emoji label='automation' symbol='🤖' />
        &nbsp;
        <Emoji label='lights' symbol='💡️' />
        &nbsp;
        <Emoji label='workout' symbol='💪' />
        &nbsp;
        <Emoji label='ski' symbol='⛷' />
      </p>
    </section>
  );
}
