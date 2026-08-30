import React from 'react';
import { AnchorButton } from '../elements/Button/Button';

export default function ResumeSection() {
  return (
    <section className='text-center m-20'>
      <h3>Hi, I&apos;m Barry</h3>
      <p>I&apos;m a software engineer with a passion for technology.</p>
      <AnchorButton text='Download Resume' to='/Barry_McAndrews_8-30-2026.pdf' />
    </section>
  );
}
