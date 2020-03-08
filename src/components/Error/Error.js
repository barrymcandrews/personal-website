import React from 'react';
import {LinkButton} from "../Button/Button";
import styles from "./Error.module.scss";

function Error() {
  return (
      <div className={styles.container}>
        <div>
        <header>
            <code>Error 404</code>
            <h1>Page not found.</h1>
        </header>

        <section className="text-center m-5">
          <LinkButton to="/">Go Home</LinkButton>
        </section>
        </div>
      </div>
  );
}

export default Error;
