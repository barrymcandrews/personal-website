import React, {Suspense} from 'react';
import classes from './Footer.module.scss';
const Terminal = React.lazy(() => import("../Terminal/Terminal"));


export default function Footer(props: any) {
  return (
    <section className={classes.bgDark}>
      <div className={classes.container}>
        <div className={classes.m20}>
          <Suspense fallback={<div/>}>
            <Terminal/>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
