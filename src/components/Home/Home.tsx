import React from 'react';
import {AnchorButton} from '../Button/Button'
import Emoji from "../Emoji";
import Terminal from "../Terminal/Terminal";
import './Home.scss';
import barry from './barry.jpg';
import github from './github.png';
import linkedin from './linkedin.jpg';
import awsArchitectAssociate from './aws-certified-solutions-architect-associate.png';

function Home() {
  return (
    <div className="Home">
      <div className="container">
        <header className="Home-header">
          <div><img className="Home-image" src={barry} height={130} width={130} alt="Barry"/></div>
          <div className="header-text">
            <h1>Barry</h1><br/>
            <h1>McAndrews</h1><br/>
            <h2 className="subtitle">Software Engineer</h2>
          </div>
        </header>

        <section className="text-center m-20">
          <h3>Hi, I'm Barry</h3>
          <p>I'm a software engineer with a passion for technology.</p>
          <AnchorButton to={process.env.PUBLIC_URL + "/Barry_McAndrews_6-02-20.pdf"}>Download Resume</AnchorButton>
        </section>

        <section className="flex m-20">
          <div>
            <div className="text-center desktop-hide">
              <img className="mb-40" src={linkedin} height={100} width={100} alt="LinkedIn Logo"/>
            </div>
            <code>$ open https://www.linkedin.com/in/barry-mcandrews/</code>
            <h4>LinkedIn</h4>
            <p className="mw-450">
              For more information about me check out my
              LinkedIn page. There you can find my most
              up-to-date employment information. Feel free
              to send me a message!
            </p>
            <AnchorButton to="https://www.linkedin.com/in/barry-mcandrews/">Go to LinkedIn</AnchorButton>
          </div>
          <img className="mobile-hide" src={linkedin} height={100} width={100} alt="LinkedIn Logo"/>
        </section>

        <section className="flex m-20">
          <div>
            <div className="text-center desktop-hide">
              <img className="mb-40" src={github} height={100} width={100} alt="GitHub Logo"/>
            </div>
            <code>$ open https://github.com/barrymcandrews</code>
            <h4>GitHub</h4>
            <p className="mw-450">
              Most of my personal projects are hosted on
              GitHub. Check out my favorite project, <a href="https://github.com/barrymcandrews/aurora-server">Aurora Server</a>, which I created to enhance
              my house’s LED lights.
            </p>
            <AnchorButton to="https://github.com/barrymcandrews">Go to GitHub</AnchorButton>
          </div>
          <img className="mobile-hide" src={github} height={100} width={100} alt="GitHub Logo"/>
        </section>

        <section className="text-center m-20">
          <code>$ aws iam get-user</code>
          <h3>AWS Certified.</h3>
          <p className="aws-paragraph">
            As a developer, the cloud opens up a world of exciting possibilities!
            To help me take full advantage of this tool, I’ve gotten AWS Certified.
            (Don’t worry, I have <Emoji symbol="❤️" label="love"/> for GCP and Azure too!)
          </p>
          <img className="aws-badge" src={awsArchitectAssociate} height={150} width={150} alt="AWS Solutions Architect Associate Badge" />
        </section>

        <section className="text-center m-20">
          <code>$ mail bmcandrews@pitt.edu</code>
          <h3>Send me an email!</h3>
          <p>
            Whether it’s a job, side project, or anything else, I’m always looking
            to explore new ideas and opportunities.
          </p>
          <AnchorButton to="mailto:bmcandrews@pitt.edu">Contact Me</AnchorButton>
        </section>
      </div>

      <section className="bg-dark">
        <div className="container">
          <div className="m-20">
            <Terminal/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
