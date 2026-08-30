import React from 'react';
import awsArchitectAssociate from '../../../../public/images/aws-certified-solutions-architect-associate.png';
import classes from './CertificationSection.module.scss';
import Image from 'next/image';

export default function CertificationSection() {
  return (
    <section className={classes.CertificationSection}>
      <div className={classes.textCard}>
        <div className={classes.header}>
          <code>$ aws iam get-user</code>
          <h3>Committed to the cloud.</h3>
        </div>
        <p className={classes.awsParagraph}>
          I picked up an AWS Solutions Architect certification while learning how modern systems fit
          together. AWS was the starting point, but I&apos;ve since spent plenty of time building in
          Azure too.
        </p>
      </div>
      <div className={classes.imgCard}>
        <Image
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
