import React from 'react';
import classes from './Card.module.scss';
import { AnchorButton, ButtonProps } from '../Button/Button';
import { Link } from 'react-router-dom';

export interface CardProps {
  className?: string;
  title?: string;
  body?: JSX.Element | string;
  code?: string;
  image?: string;
  button: ButtonProps;
}

export default function Card(props: CardProps) {
  return (
    <Link className={classes.globalLink} target='_blank' to={{ pathname: props.button.to }}>
      <section className={classes.Card + ' ' + props.className}>
        <div className={classes.imageContainer}>
          <img alt='LinkedIn Logo' height={100} src={props.image} width={100} />
        </div>
        <div className={classes.content}>
          <code>{props.code}</code>
          <h4>{props.title}</h4>
          <div className={classes.cardText}>{props.body}</div>
        </div>
        <div className={classes.button}>
          <Link className={classes.cardLink} target='_blank' to={{ pathname: props.button.to }}>
            {props.button.text} ›
          </Link>
        </div>
      </section>
    </Link>
  );
}
