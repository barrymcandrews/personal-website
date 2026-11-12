import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import barry from '../../../../public/images/barry.jpg';

export function Navbar() {
  const { pathname } = useRouter();
  const isApps =
    pathname === '/apps' ||
    pathname.startsWith('/apps/') ||
    pathname === '/afterframe' ||
    pathname.startsWith('/afterframe/');

  if (pathname === '/') return null;

  return (
    <header className={styles.bar}>
      <Link className={styles.barTitle} href='/'>
        <Image alt='' className={styles.portrait} height={36} src={barry} width={36} />
        <span>
          Barry
          <br />
          McAndrews
        </span>
      </Link>
      <nav aria-label='Main navigation' className={styles.links}>
        <Link className={styles.barItem} href='/'>
          Home
        </Link>
        <Link
          aria-current={isApps ? (pathname === '/apps' ? 'page' : 'location') : undefined}
          className={styles.barItem}
          href='/apps'
        >
          Apps
        </Link>
      </nav>
    </header>
  );
}
