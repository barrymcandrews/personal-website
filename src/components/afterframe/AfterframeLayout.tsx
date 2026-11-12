import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '../elements/Navbar/Navbar';
import classes from './Afterframe.module.scss';

type Props = {
  children: ReactNode;
  page: 'overview' | 'privacy' | 'support';
  title: string;
  description: string;
};

export default function AfterframeLayout({ children, page, title, description }: Props) {
  return (
    <div className={`${classes.page} ${page === 'overview' ? classes.overviewPage : ''}`}>
      <Head>
        <title>{title}</title>
        <meta key='description' content={description} name='description' />
        <meta content='noindex, nofollow' name='robots' />
      </Head>
      <a className={classes.skipLink} href='#afterframe-content'>
        Skip to content
      </a>
      <Navbar />
      <main
        className={`${classes.container} ${
          page === 'overview' ? classes.productContainer : classes.documentContainer
        }`}
        id='afterframe-content'
        tabIndex={-1}
      >
        {page !== 'overview' && (
          <nav aria-label='Breadcrumb' className={classes.breadcrumb}>
            <ol>
              <li>
                <Link href='/afterframe'>Afterframe</Link>
              </li>
              <li>
                <span aria-hidden='true'>/</span>
                <span aria-current='page'>{page === 'privacy' ? 'Privacy' : 'Support'}</span>
              </li>
            </ol>
          </nav>
        )}
        {children}
      </main>
    </div>
  );
}
