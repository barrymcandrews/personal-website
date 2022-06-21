import React from 'react';
import classes from '../pages/Home/Home.module.scss';
import Emoji from '../components/Emoji';
import awsArchitectAssociate from '../pages/Home/aws-certified-solutions-architect-associate.png';

export default function CertificationSection() {
  return (
    <section className='text-center m-20'>
      <code>$ aws iam get-user</code>
      <h3>AWS Certified.</h3>
      <p className={classes.awsParagraph}>
        The cloud opens up a world of new and exciting possibilities!
        <br />
        To help me take full advantage of this tool, I’ve gotten AWS Certified. (Don’t worry, I have{' '}
        <Emoji label='love' symbol='❤️' /> for GCP and Azure too!)
      </p>
      <img
        alt='AWS Solutions Architect Associate Badge'
        className={classes.awsBadge}
        height={150}
        src={awsArchitectAssociate}
        width={150}
      />
    </section>
  );
}
