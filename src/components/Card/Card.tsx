import React from 'react';
import classes from './Card.module.scss';
import { AnchorButton, ButtonProps } from '../Button/Button';

export interface CardProps {
  className?: string;
  title?: string;
  body?: JSX.Element | string;
  code?: string;
  image?: string;
  button?: ButtonProps;
}

export default function Card(props: CardProps) {
  return (
    <section className={classes.Card + ' ' + props.className}>
      <div className={classes.imageContainer}>
        <img alt='LinkedIn Logo' height={100} src={props.image} width={100} />
      </div>
      <div className={classes.content}>
        <code>{props.code}</code>
        <h4>{props.title}</h4>
        <div className={classes.cardText}>{props.body}</div>
        {props.button && (
          <div className={classes.button}>
            <AnchorButton {...props.button} />
          </div>
        )}
      </div>
      {/*<a>See More ›</a>*/}
    </section>
  );
}
