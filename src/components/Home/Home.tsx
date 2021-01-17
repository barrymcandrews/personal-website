import React from 'react';
import {AnchorButton} from '../Button/Button'
import Emoji from "../Emoji";
import Card from '../Card/Card';
import classes from './Home.module.scss'
import barry from './barry.jpg';
import github from './github.png';
import linkedin from './linkedin.jpg';
import awsArchitectAssociate from './aws-certified-solutions-architect-associate.png';

function Home() {
  return (
    <div className={classes.Home}>
      <div className={classes.container}>
        <header className={classes.header}>
          <div><img className={classes.image} src={barry} height={130} width={130} alt="Barry"/></div>
          <div className={classes.headerText}>
            <h1>Barry</h1><br/>
            <h1>McAndrews</h1><br/>
            <h2 className={classes.subtitle}>Software Engineer</h2>
          </div>
        </header>

        <section className="text-center m-20">
          <h3>Hi, I'm Barry</h3>
          <p>I'm a software engineer with a passion for technology.</p>
          <AnchorButton to={process.env.PUBLIC_URL + "/Barry_McAndrews_8-19-20.pdf"} text="Download Resume"/>
        </section>

        <Card className={classes.section}
              image={linkedin}
              code="$ open https://www.linkedin.com/in/barry-mcandrews/"
              title="LinkedIn"
              body="For more information about me check out my
                    LinkedIn page. There you can find my most
                    up-to-date employment information. Feel free
                    to send me a message!"
              button={{
                text: "Go to LinkedIn",
                to: "https://www.linkedin.com/in/barry-mcandrews/"
              }}
        />

        <Card image={github}
              code="$ open https://github.com/barrymcandrews"
              title="GitHub"
              body={<>Most of my personal projects are hosted on
                     GitHub. Check out my favorite project, <a href="https://github.com/barrymcandrews/aurora-server">Aurora Server</a>, which I created to enhance
                     my house’s LED lights.</>}
              button={{
                text: "Go to GitHub",
                to: "https://github.com/barrymcandrews"
              }}
        />

        <section className="text-center m-20">
          <code>$ whoami</code>
          <h3 className={classes.aboutTitle}>About Me</h3>
          <p className={classes.bioParagraph}>
            My name is Barry McAndrews, and I'm an accomplished Software Engineer with a passion for the cloud
            and home automation. Through my work at Vanguard, I've gained first-hand experience with cutting edge
            cloud technologies. This experience opened my eyes to just how powerful the cloud can be, and it inspired me
            to achieve my first AWS certification.
          </p>
          <p className={classes.bioParagraph}>
            As an engineer, I'm is always looking for ways to solve problems, and often find myself putting my
            software (and occasionally hardware) skills to use in home automation projects. I find the challenge of
            making a better product than one you could buy in a store almost irresistible.
          </p>
          <p className={classes.bioParagraph}>
            When I'm not working, you can find me taking a walk, working out, or skiing down a mountain.
          </p>
          <p>
            <Emoji symbol="☁️" label="cloud"/>&nbsp;
            <Emoji symbol="🤖" label="automation"/>&nbsp;
            <Emoji symbol="💡️" label="lights"/>&nbsp;
            <Emoji symbol="💪" label="workout"/>&nbsp;
            <Emoji symbol="⛷" label="ski"/>
          </p>
        </section>

        <section className="text-center m-20">
          <code>$ aws iam get-user</code>
          <h3>AWS Certified.</h3>
          <p className={classes.awsParagraph}>
            The cloud opens up a world of new and exciting possibilities!<br/>
            To help me take full advantage of this tool, I’ve gotten AWS Certified.
            (Don’t worry, I have <Emoji symbol="❤️" label="love"/> for GCP and Azure too!)
          </p>
          <img className={classes.awsBadge} src={awsArchitectAssociate} height={150} width={150} alt="AWS Solutions Architect Associate Badge" />
        </section>

        <section className="text-center m-20">
          <code>$ mail bmcandrews@pitt.edu</code>
          <h3>Send me an email!</h3>
          <p>
            Whether it’s a job, side project, or anything else, I’m always looking
            to explore new ideas and opportunities.
          </p>
          <AnchorButton to="mailto:bmcandrews@pitt.edu" text="Contact Me"/>
        </section>
      </div>
    </div>
  );
}

export default Home;
