import React, { useEffect, useState } from 'react';
import classes from './Footer.module.scss';
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('../Terminal/Terminal'), { ssr: false });

export default function Footer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idle: number | undefined;
    let timer: number | undefined;

    const afterLoad = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      const mount = () => {
        if (!cancelled) setReady(true);
      };
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(mount, { timeout: 3000 });
      } else {
        timer = window.setTimeout(mount, 0);
      }
    };

    if (document.readyState === 'complete') {
      void afterLoad();
    } else {
      window.addEventListener('load', afterLoad, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener('load', afterLoad);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className={classes.bgDark}>
      <div className={classes.container}>
        <div className={classes.terminalSlot}>{ready && <Terminal />}</div>
      </div>
    </section>
  );
}
