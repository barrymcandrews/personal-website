import React from 'react';
import { AnchorButton } from '../elements/Button/Button';

export default function MailSection() {
  return (
    <section className='text-center m-20'>
      <code>$ mail bmcandrews3@gmail.com</code>
      <h3>Say hello</h3>
      <p>
        Whether it’s a job, side project, or anything else, I’m always looking to explore new ideas
        and opportunities.
      </p>
      <AnchorButton text='Contact Me' to='mailto:bmcandrews3@gmail.com' />
    </section>
  );
}
