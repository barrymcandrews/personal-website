import React from 'react';
import classes from './Card.module.scss';
import {AnchorButton} from '../Button/Button';

export interface LinkProps {
  text: string
  to: string
}

export interface CardProps {
  className?: string
  title?: string
  body?: JSX.Element | string
  code?: string
  image?: string
  button?: LinkProps
}

export default function Card(props: CardProps) {
  return (
    <section className={classes.Card + " " + props.className}>

      <div className={classes.imageContainer}>
        <img src={props.image} height={100} width={100} alt="LinkedIn Logo"/>
      </div>
      <div className={classes.content}>
        <code>{props.code}</code>
        <h4>{props.title}</h4>
        <div className={classes.cardText}>{props.body}</div>
        {props.button &&
          <div className={classes.button}>
            <AnchorButton to={props.button.to}>{props.button.text}</AnchorButton>
          </div>
        }
      </div>
      {/*<a>See More ›</a>*/}
    </section>
  );
}
