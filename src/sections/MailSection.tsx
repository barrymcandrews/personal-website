import React from 'react';
import { AnchorButton } from '../components/Button/Button';

export default function MailSection() {
  return (
    <section className='text-center m-20'>
      <code className='text-gray-600'>$ mail bmcandrews@pitt.edu</code>
      <h3 className='text-slate-900 font-title font-bold text-md'>Send me an email!</h3>
      <p>
        Whether it’s a job, side project, or anything else, I’m always looking to explore new ideas
        and opportunities.
      </p>
      <AnchorButton text='Contact Me' to='mailto:bmcandrews@pitt.edu' />
    </section>
  );
}
