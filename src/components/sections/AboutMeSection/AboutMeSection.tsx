import React from 'react';
import classes from './AboutMe.module.scss';
import bioPic1 from '../../../../public/images/bio-1.jpg';
import bioPic3 from '../../../../public/images/bio-3.jpg';
import Image from 'next/image';

export default function AboutMeSection() {
  return (
    <section className={classes.aboutMeSection}>
      <div className={classes.imgColumn}>
        <div className={classes.imgCard}>
          <Image alt='Picture of Barry' height={200} src={bioPic1} width={200} />
        </div>
        <div className={classes.imgCard}>
          <Image alt='Picture of Barry' height={250} src={bioPic3} width={200} />
        </div>
      </div>
      <div className={classes.bioCard}>
        <div className={classes.bioHeader}>
          <code>$ whoami</code>
          <h3 className={classes.aboutTitle}>About Me</h3>
        </div>
        <div className={classes.bioBody}>
          <p className={classes.bioParagraph}>
            I&apos;m Barry, a software engineer and photographer. At DICK&apos;S Sporting Goods, I
            build the behind-the-scenes tools that help customer service teams get people the
            answers they need. That includes our in-house CRM, chat experiences, and an AI assistant
            for the folks doing the work every day.
          </p>
          <p className={classes.bioParagraph}>
            I like taking problems and figuring out the best way to solve them. Sometimes that means
            building a big data pipeline. Other times, it can mean simply moving a button around. A
            lot of times, no code change is needed at all.
          </p>
          <p className={classes.bioParagraph}>
            I like getting to the root of a problem, questioning assumptions, and finding the
            simplest thing that actually works. I’m much more interested in building the right thing
            than building the most impressive thing.{' '}
          </p>
          <p className={classes.bioParagraph}>
            <b>As an engineer, my job is to solve problems and, when necessary, write code.</b>
          </p>
          <p className={classes.bioParagraph}>
            Away from the keyboard, I&apos;m usually out with a camera. In this era of AI, film
            photography feels very authentic to me. I love being able to capture the world around me
            in a way that feels real and meaningful.
          </p>
          {/*<p>*/}
          {/*  <Emoji label='cloud' symbol='☁️' />*/}
          {/*  &nbsp;*/}
          {/*  <Emoji label='automation' symbol='🤖' />*/}
          {/*  &nbsp;*/}
          {/*  <Emoji label='lights' symbol='💡️' />*/}
          {/*  &nbsp;*/}
          {/*  <Emoji label='workout' symbol='💪' />*/}
          {/*  &nbsp;*/}
          {/*  <Emoji label='ski' symbol='⛷' />*/}
          {/*</p>*/}
        </div>
      </div>
    </section>
  );
}
