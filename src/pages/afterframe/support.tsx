import React from 'react';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Support() {
  return (
    <AfterframeLayout
      description='Contact Afterframe support and get help with Photos access, OpenAI settings, app data, and purchases.'
      page='support'
      title='Afterframe Support — Barry McAndrews'
    >
      <h1>Afterframe Support</h1>
      <p>
        Email <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a> for help. Include
        your app version, iOS version, device model, and what happened. Do not send API keys,
        passwords, or unnecessary private photographs.
      </p>
      <article aria-label='Support and privacy choices' className={classes.document}>
        <section id='photo-access'>
          <h2>Photos access</h2>
          <p>
            In iOS Settings, open <strong>Apps → Afterframe → Photos</strong>, or{' '}
            <strong>Privacy &amp; Security → Photos</strong>, to change access. Limited access
            restricts which photos Afterframe can use. Revoking access does not undo metadata edits
            already saved to Apple Photos or erase existing app data.
          </p>
        </section>
        <section id='openai'>
          <h2>OpenAI and on-device processing</h2>
          <p>
            Open Afterframe’s <strong>Settings → Search &amp; AI</strong>. Under AI assistance,
            choose <strong>On this device</strong> or <strong>OpenAI</strong>. Use{' '}
            <strong>Prepare descriptions automatically</strong> to control automatic descriptions.
            In <strong>Advanced Search Settings</strong>, check{' '}
            <strong>Process descriptions</strong> and <strong>Description search</strong>{' '}
            separately. Choosing an on-device assistant does not turn off other OpenAI features.
          </p>
          <p>
            To disconnect, open <strong>Connections → OpenAI → Disconnect and remove key</strong>.
            This stops future OpenAI requests and cancels active requests where possible. It does
            not recall information already sent, erase provider records, or reverse charges. If the
            app reports that key removal failed, unlock the device and try again. Revoke an exposed
            key in your OpenAI account.
          </p>
          <p>
            Connecting runs a check that may incur OpenAI API charges. Read the{' '}
            <Link href='/afterframe/privacy#openai'>OpenAI data-handling explanation</Link> before
            connecting or enabling cloud features.
          </p>
        </section>
        <section id='app-data'>
          <h2>Deleting app data</h2>
          <ul>
            <li>
              <strong>Chats:</strong> open <strong>Chats</strong>, swipe a conversation, and tap{' '}
              <strong>Delete</strong>. Starting a new chat does not delete previous ones.
            </li>
            <li>
              <strong>Rolls:</strong> removing a photo from a roll does not delete its original in
              Apple Photos.
            </li>
            <li>
              <strong>Demo search index:</strong> in <strong>Advanced Search Settings</strong>, the
              demo-only <strong>Clear demo image index</strong> action preserves descriptions,
              sample photos, downloaded models, and settings.
            </li>
            <li>
              <strong>API key:</strong> use <strong>Disconnect and remove key</strong> in
              Connections, as described above.
            </li>
          </ul>
          <p>
            These controls remove only their named data. Chat deletion does not clear separate
            recovery records, older local copies, or backups. Descriptions, caches, and downloaded
            models have separate lifecycles. Uninstalling is not a guarantee of complete erasure,
            and app controls do not delete provider-held records. For help with remaining app data,
            contact support; see{' '}
            <Link href='/afterframe/privacy#retention'>retention and deletion</Link>.
          </p>
        </section>
        <section id='privacy-requests'>
          <h2>Privacy requests</h2>
          <p>
            Email support to request access, correction, or deletion of personal information I hold,
            or to raise a privacy complaint. Describe the information and request concerned; do not
            send identity documents unless needed and requested. I cannot remotely erase information
            held only on your device. See the{' '}
            <Link href='/afterframe/privacy#choices'>Privacy Policy</Link> for rights and complaint
            routes. There is no guaranteed general support response time; applicable privacy-request
            deadlines still apply.
          </p>
        </section>
        <section id='purchases'>
          <h2>Purchases and refunds</h2>
          <p>
            Afterframe’s App Store purchase is a one-time payment, not a subscription. The price
            shown in your App Store applies. Optional OpenAI API usage is billed separately by
            OpenAI. The app is licensed under{' '}
            <a href='https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'>
              Apple’s standard license agreement
            </a>
            .
          </p>
          <p>
            For App Store refund requests, follow{' '}
            <a href='https://support.apple.com/118223'>Apple’s refund instructions</a>. This does
            not limit your statutory consumer rights.
          </p>
        </section>
      </article>
    </AfterframeLayout>
  );
}
