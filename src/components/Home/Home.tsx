import React from 'react';
import { AnchorButton } from '../Button/Button';
import Emoji from '../Emoji';
import Card from '../Card/Card';
import classes from './Home.module.scss';
import barry from './barry.jpg';
import github from './github.png';
import linkedin from './linkedin.jpg';
import awsArchitectAssociate from './aws-certified-solutions-architect-associate.png';

function Home() {
  return (
    <div className={classes.Home}>
      <div className={classes.container}>
        <header className={classes.header}>
          <div>
            <img
              alt='Barry McAndrews'
              className={classes.image}
              height={130}
              src={barry}
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

        <section className='text-center m-20'>
          <h3>Hi, I&apos;m Barry</h3>
          <p>I&apos;m a software engineer with a passion for technology.</p>
          <AnchorButton
            text='Download Resume'
            to={process.env.PUBLIC_URL + '/Barry_McAndrews_8-19-20.pdf'}
          />
        </section>

        <Card
          body='For more information about me check out my
                    LinkedIn page. There you can find my most
                    up-to-date employment information. Feel free
                    to send me a message!'
          button={{
            text: 'Go to LinkedIn',
            to: 'https://www.linkedin.com/in/barry-mcandrews/'
          }}
          className={classes.section}
          code='$ open https://www.linkedin.com/in/barry-mcandrews/'
          image={linkedin}
          title='LinkedIn'
        />

        <Card
          body={
            <>
              Most of my personal projects are hosted on GitHub. Check out my favorite project,{' '}
              <a href='https://github.com/barrymcandrews/aurora-server'>Aurora Server</a>, which I
              created to enhance my house’s LED lights.
            </>
          }
          button={{
            text: 'Go to GitHub',
            to: 'https://github.com/barrymcandrews'
          }}
          code='$ open https://github.com/barrymcandrews'
          image={github}
          title='GitHub'
        />

        <section className='text-center m-20'>
          <code>$ whoami</code>
          <h3 className={classes.aboutTitle}>About Me</h3>
          <p className={classes.bioParagraph}>
            My name is Barry McAndrews, and I&apos;m an accomplished Software Engineer with a
            passion for the cloud and home automation. Through my work at Vanguard, I&apos;ve gained
            first-hand experience with cutting edge cloud technologies. This experience opened my
            eyes to just how powerful the cloud can be, and it inspired me to achieve my first AWS
            certification.
          </p>
          <p className={classes.bioParagraph}>
            As an engineer, I&apos;m always looking for ways to solve problems, and often find
            myself putting my software (and occasionally hardware) skills to use in home automation
            projects. I find the challenge of making a better product than one you could buy in a
            store almost irresistible.
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

        <section className='text-center m-20'>
          <code>$ aws iam get-user</code>
          <h3>AWS Certified.</h3>
          <p className={classes.awsParagraph}>
            The cloud opens up a world of new and exciting possibilities!
            <br />
            To help me take full advantage of this tool, I’ve gotten AWS Certified. (Don’t worry, I
            have <Emoji label='love' symbol='❤️' /> for GCP and Azure too!)
          </p>
          <img
            alt='AWS Solutions Architect Associate Badge'
            className={classes.awsBadge}
            height={150}
            src={awsArchitectAssociate}
            width={150}
          />
        </section>

        <section className='text-center m-20'>
          <code>$ mail bmcandrews@pitt.edu</code>
          <h3>Send me an email!</h3>
          <p>
            Whether it’s a job, side project, or anything else, I’m always looking to explore new
            ideas and opportunities.
          </p>
          <AnchorButton text='Contact Me' to='mailto:bmcandrews@pitt.edu' />
        </section>
      </div>
    </div>
  );
}

export default Home;
