import React from 'react';
import { AnchorButton } from '../components/Button/Button';

export default function ResumeSection() {
  return (
    <section className='text-center m-20'>
      <h3 className='text-slate-900 font-title font-bold text-md'>Hi, I&apos;m Barry</h3>
      <p>I&apos;m a software engineer with a passion for technology.</p>
      <AnchorButton
        text='Download Resume'
        to={process.env.PUBLIC_URL + '/Barry_McAndrews_8-19-20.pdf'}
      />
    </section>
  );
}