import React from 'react';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Support() {
  return (
    <AfterframeLayout
      description='Contact Afterframe support and find help with permissions, OpenAI, privacy choices, and purchases.'
      page='support'
      title='Afterframe Support — Barry McAndrews'
    >
      <h1>Afterframe Support</h1>
      <p>
        Email <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a> for help. Include
        your app version, iOS version, device model, and a description of the problem. Don’t send
        API keys, passwords, or unnecessary private photos.
      </p>
      <p className={classes.draft}>
        <strong>Draft for review.</strong> App navigation and deletion guidance need release-build
        confirmation before publication.
      </p>
      <article aria-label='Support and privacy choices' className={classes.document}>
        <section id='photo-access'>
          <h2>Photo access</h2>
          <p>
            Manage access in iOS Settings under Apps → Afterframe → Photos, or Privacy &amp;
            Security → Photos. Limited access restricts which photos the app can use. Revoking
            access does not undo saved edits or erase all derived data.
          </p>
        </section>
        <section id='openai'>
          <h2>OpenAI</h2>
          <p>
            Choose your assistant in Search or Ask → Settings → Search &amp; AI. Check
            photo-description and description-search providers separately in Advanced Search
            Settings.
          </p>
          <p>
            Remove your saved API key through Connections → OpenAI → Disconnect and remove key. This
            does not recall already-sent requests, erase provider records, or reverse charges.
            Handling of pending work remains under review.
          </p>
        </section>
        <section id='app-data'>
          <h2>Deleting app data</h2>
          <p>
            Delete saved conversations through Chats; starting a new chat does not delete old ones.
            Recovery records, cached images, legacy data, and backups have separate lifecycles.
            Clearing an image-search index preserves descriptions and downloaded models.
          </p>
          <p>
            Removing a photo from a roll does not delete the original in Apple Photos. Uninstalling
            is not a guarantee of complete erasure. See{' '}
            <Link href='/afterframe/privacy#retention'>retention and deletion</Link> for
            limitations.
          </p>
        </section>
        <section id='privacy-requests'>
          <h2>Privacy requests</h2>
          <p>
            Email support to request access, correction, or deletion of information the publisher
            holds, or to raise a complaint. The publisher cannot remotely erase data held only on
            your device. See the{' '}
            <Link href='/afterframe/privacy#choices'>Privacy Policy draft</Link> for rights,
            response periods, and complaint routes.
          </p>
        </section>
        <section id='purchases'>
          <h2>Purchases</h2>
          <p>
            Afterframe is planned as a one-time paid app under{' '}
            <a href='https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'>
              Apple’s standard license
            </a>
            . Optional OpenAI API charges are separate.
          </p>
          <p>
            For App Store refunds, follow{' '}
            <a href='https://support.apple.com/118223'>Apple’s guidance</a>. This does not limit
            your statutory consumer rights.
          </p>
        </section>
      </article>
    </AfterframeLayout>
  );
}
