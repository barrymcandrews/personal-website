import React from 'react';
import Emoji from '../../components/Emoji';
import awsArchitectAssociate from '../../pages/Home/aws-certified-solutions-architect-associate.png';
import classes from './CertificationSection.module.scss';

export default function CertificationSection() {
  return (
    <section className={classes.CertificationSection}>
      <div className={classes.textCard}>
        <div className={classes.header}>
          <code>$ aws iam get-user</code>
          <h3>AWS Certified.</h3>
        </div>
        <p className={classes.awsParagraph}>
          The cloud opens up a world of new and exciting possibilities!
          <br />
          To help me take full advantage of this tool, I’ve gotten AWS Certified. (Don’t worry, I
          have <Emoji label='love' symbol='❤️' /> for GCP and Azure too!)
        </p>
      </div>
      <div className={classes.imgCard}>
        <img
          alt='AWS Solutions Architect Associate Badge'
          className={classes.awsBadge}
          height={150}
          src={awsArchitectAssociate}
          width={150}
        />
      </div>
    </section>
  );
}
