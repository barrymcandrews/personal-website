import React from 'react';
import {Button} from '../Button/Button'
import Terminal from "../Terminal/Terminal";
import LastVisited from "../LastVisited/LastVisited";
import './Home.scss';
import barry from './barry.jpg';
import github from './github.png';
import linkedin from './linkedin.png';

function Home() {
  return (
    <div className="Home">
      <div className="container">
        <LastVisited/>
        <header className="Home-header">
          <div><img className="Home-image" src={barry} width="200px" alt="Barry"/></div>
          <div className="header-text">
            <h1>Barry</h1><br/>
            <h1>McAndrews</h1><br/>
            <h2>Software Engineer</h2>
          </div>
        </header>

        <section className="text-center m-5">
          <h3>Hi, I'm Barry</h3>
          <p>I'm a software engineer with a passion for technology.</p>
          <Button href="https://www.bmcandrews.com/Barry_McAndrews_2-24-20.pdf">Download Resume</Button>
        </section>

        <section className="flex m-5">
          <div>
            <code>$ open https://www.linkedin.com/in/barry-mcandrews/</code>
            <h4>LinkedIn</h4>
            <p className="mw-300">
              For more information about me check out my
              LinkedIn page. There you can find my most
              up-to-date employment information. Feel free
              to send me a message!
            </p>
            <Button href="https://www.linkedin.com/in/barry-mcandrews/">See More</Button>
          </div>
          <img className="mobile-hide" src={linkedin} width="100px" alt="LinkedIn Logo"/>
        </section>

        <section className="flex m-5">
          <div>
            <code>$ open https://github.com/barrymcandrews</code>
            <h4>GitHub</h4>
            <p className="mw-300">
              Most of my personal projects are hosted on
              GitHub. Check out my favorite project, <a href="https://github.com/barrymcandrews/aurora-server">Aurora Server</a>, which I created to enhance
              my house’s LED lights.
            </p>
            <Button href="https://github.com/barrymcandrews">See More</Button>
          </div>
          <img className="mobile-hide" src={github} width="100px" alt="GitHub Logo"/>
        </section>

        <section className="text-center m-5">
          <code>$ mail bmcandrews@pitt.edu</code>
          <h3>Send me an email!</h3>
          <p>
            Whether it’s a job, side project, or anything else, I’m always looking
            to explore new ideas and opportunities.
          </p>
          <Button href="mailto:bmcandrews@pitt.edu">Contact Me</Button>
        </section>
      </div>

      <section className="bg-dark">
        <div className="container">
          <div className="m-5">
            <Terminal/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
