import React from 'react';
import Head from 'next/head';
import { Navbar } from '../components/elements/Navbar/Navbar';
import AfterframeCard from '../components/apps/AfterframeCard';
import classes from '../components/apps/Apps.module.scss';

export default function Apps() {
  return (
    <div className={classes.page}>
      <Head>
        <title>Apps — Barry McAndrews</title>
        <meta
          key='description'
          content='Apps by Barry McAndrews, including Afterframe for film photography.'
          name='description'
        />
        <meta content='noindex, nofollow' name='robots' />
      </Head>
      <Navbar />
      <main className={classes.container}>
        <h1>Apps</h1>
        <AfterframeCard />
      </main>
    </div>
  );
}
