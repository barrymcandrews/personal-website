import React from 'react';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Privacy() {
  return (
    <AfterframeLayout
      description='How the Afterframe app handles photos, optional OpenAI features, support correspondence, and your privacy choices.'
      page='privacy'
      title='Afterframe Privacy Policy'
    >
      <h1>Afterframe Privacy Policy</h1>
      <p className={classes.effectiveDate}>
        Effective date: <time dateTime='2026-11-13'>November 13, 2026</time>
      </p>
      <p>
        This policy covers the Afterframe app and Afterframe support correspondence. It is not a
        privacy policy for the rest of bmcandrews.com.
      </p>
      <nav aria-label='On this page' className={classes.contents}>
        <h2>On this page</h2>
        <ul>
          <li>
            <a href='#publisher'>Who provides Afterframe</a>
          </li>
          <li>
            <a href='#photos'>Photos and on-device data</a>
          </li>
          <li>
            <a href='#openai'>Optional OpenAI features</a>
          </li>
          <li>
            <a href='#credentials'>Your API key</a>
          </li>
          <li>
            <a href='#local'>Model downloads and Apple services</a>
          </li>
          <li>
            <a href='#support'>Support correspondence</a>
          </li>
          <li>
            <a href='#retention'>Retention and deletion</a>
          </li>
          <li>
            <a href='#choices'>Your choices and privacy requests</a>
          </li>
          <li>
            <a href='#international'>International processing and children</a>
          </li>
          <li>
            <a href='#changes'>Policy changes</a>
          </li>
        </ul>
      </nav>
      <article aria-label='Privacy policy' className={classes.document}>
        <section id='publisher'>
          <h2>Who provides Afterframe</h2>
          <p>
            Afterframe is provided by <strong>Michael Barry McAndrews</strong>, an individual in
            Newtown, Pennsylvania, United States. I am responsible for personal information I handle
            as the publisher and am your contact for privacy questions and complaints.
          </p>
          <p>
            Email: <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a>.
            <br />
            Mail: Michael Barry McAndrews, 161 Cliveden Dr., Newtown, PA 18940, United States.
            <br />
            Telephone: <a href='tel:+12155889243'>+1 (215) 588-9243</a>.
          </p>
        </section>
        <section id='photos'>
          <h2>Photos and on-device data</h2>
          <p>
            Afterframe uses the Photos access you grant to display photos, organize them into rolls,
            search and analyze your collection, and save metadata edits you choose. Photo
            information can include filenames, identifiers, dates, locations, camera and lens
            details, and film and exposure settings.
          </p>
          <p>
            The app stores collection information, preferences, metadata drafts, descriptions,
            search indexes, conversations, and change-recovery information on your device. Local
            caches can include image copies. Organizing a photo into a roll references its Apple
            Photos asset; it does not itself duplicate the original or create an Apple Photos album.
            Saving metadata edits is a separate action.
          </p>
          <p>
            On-device analysis runs locally. Optional OpenAI processing is described below; choosing
            an on-device provider for one feature does not change the choices for other features.
          </p>
        </section>
        <section id='openai'>
          <h2>Optional OpenAI features</h2>
          <p>
            If you choose OpenAI, Afterframe sends requests directly from your device to OpenAI
            using your own API key. The app asks you to review the disclosure before connecting. The
            connection check contacts OpenAI and may incur API charges. Connecting does not
            automatically select every cloud feature.
          </p>
          <ul>
            <li>
              <strong>AI assistance:</strong> messages, relevant conversation history, photos needed
              for analysis or visual review, and relevant information from app tools.
            </li>
            <li>
              <strong>Photo descriptions:</strong> photos and instructions for describing them. When
              automatic descriptions use OpenAI, eligible newly imported photos can be sent without
              a separate Send action for each photo.
            </li>
            <li>
              <strong>Description search:</strong> descriptions and search text used to create
              numerical search representations called embeddings.
            </li>
          </ul>
          <p>
            Relevant context can include photo and roll identifiers, filenames, dates, GPS
            coordinates, camera and film details, roll membership, descriptions, tags, proposed
            edits, and operation results. Requests are not limited to the photo attached to your
            latest message. Photos and messages may contain information about you or other people.
          </p>
          <p>
            OpenAI API use is billed separately from Afterframe. OpenAI states that API content is
            not used for model training by default unless you opt in. Its default abuse-monitoring
            logs may retain content for up to 30 days, with legal and safety exceptions. Other
            retention depends on the feature and your account settings; zero retention is not
            guaranteed. See{' '}
            <a href='https://developers.openai.com/api/docs/guides/your-data'>
              OpenAI’s API data controls
            </a>{' '}
            and <a href='https://openai.com/policies/services-agreement/'>API terms</a>.
          </p>
        </section>
        <section id='credentials'>
          <h2>Your API key</h2>
          <p>
            Your saved API key is stored in the device Keychain and sent to OpenAI to authenticate
            requests. Use <strong>Disconnect and remove key</strong> in Connections to stop future
            OpenAI requests and remove the saved key. Requests already sent cannot be recalled;
            disconnecting does not erase OpenAI’s records or reverse charges.
          </p>
          <p>
            No storage or transmission method is completely secure. If a key is exposed, revoke it
            in your OpenAI account. Never send it to support.
          </p>
        </section>
        <section id='local'>
          <h2>Model downloads and Apple services</h2>
          <p>
            Some on-device search models download from Hugging Face and GitHub. These services and
            their delivery providers receive your IP address and ordinary request information to
            deliver the files. Downloading a model does not upload your photos to those hosts. See
            the <a href='https://huggingface.co/privacy'>Hugging Face privacy policy</a> and{' '}
            <a href='https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'>
              GitHub privacy statement
            </a>
            .
          </p>
          <p>
            Apple Photos, iCloud, and device backups operate under your Apple settings and{' '}
            <a href='https://www.apple.com/legal/privacy/'>Apple’s privacy policy</a>. On-device
            processing does not mean every app or system feature works without a network connection.
          </p>
        </section>
        <section id='support'>
          <h2>Support correspondence</h2>
          <p>
            If you email support, I receive your address, message, and any attachments you send. I
            use these to answer questions, troubleshoot, and handle privacy requests or complaints.
            Email is handled through <strong>Zoho Mail</strong>. Please do not send passwords, API
            keys, or unnecessary private photographs.
          </p>
          <p>
            I remove correspondence and attachments from active support records no later than{' '}
            <strong>12 months after resolution</strong>, and earlier when no longer needed. Specific
            records needed for an ongoing dispute or legal preservation duty are kept only for that
            purpose and removed when the exception ends. You may request earlier deletion.
          </p>
          <p>
            Email recovery and backup copies have separate lifecycles. Zoho documents a recovery
            period of up to 30 days after removal from Trash. This is not a guarantee of immediate
            erasure from all copies. See{' '}
            <a href='https://www.zoho.com/privacy.html'>Zoho’s privacy policy</a> and{' '}
            <a href='https://www.zoho.com/mail/help/data-deletion-policy.html'>
              deletion and retention information
            </a>
            .
          </p>
        </section>
        <section id='retention'>
          <h2>Retention and deletion</h2>
          <p>
            Local app data remains in app storage until removed through the relevant controls or
            otherwise removed from the device. Deleting a chat removes it from current chat history,
            not separate change-recovery records, older local copies, or backups. Descriptions,
            image-search indexes, downloaded models, and image caches are separate data; clearing
            one does not erase the others.
          </p>
          <p>
            Removing a photo from a roll does not delete its original in Apple Photos. Revoking
            Photos access does not undo saved edits or erase existing app data. Device backups and
            Keychain items may outlast app removal; uninstalling is not a guarantee of complete
            erasure. Deleting local data does not delete records held by OpenAI or Apple. See{' '}
            <Link href='/afterframe/support#app-data'>Support</Link> for available controls.
          </p>
        </section>
        <section id='choices'>
          <h2>Your choices and privacy requests</h2>
          <p>
            You can limit or revoke Photos access in iOS Settings, choose on-device providers where
            available, turn off automatic descriptions, disconnect OpenAI, and delete chats. See{' '}
            <Link href='/afterframe/support'>Support and privacy choices</Link>.
          </p>
          <p>
            Email <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a> to request
            access, correction, or deletion of personal information I hold, withdraw consent where
            applicable, or raise a complaint. Applicable law may also give you a right to receive
            information you provided in a structured, commonly used format. Rights have legal limits
            and exceptions.
          </p>
          <p>
            I ask only for information reasonably needed to verify and answer your request.
            Applicable Canadian access requests generally require a response within 30 days, subject
            to lawful extensions and other applicable rules. If a request is refused or extended, I
            explain the reason and available review or complaint route.
          </p>
          <p>
            I can address support records I hold, but cannot remotely access or erase data held only
            on your device. Apple or OpenAI account requests may also require action through those
            providers. You can contact the{' '}
            <a href='https://www.priv.gc.ca/en/report-a-concern/'>
              Office of the Privacy Commissioner of Canada
            </a>
            , the{' '}
            <a href='https://www.cai.gouv.qc.ca/'>Commission d’accès à l’information du Québec</a>,
            or your applicable privacy regulator.
          </p>
        </section>
        <section id='international'>
          <h2>International processing and children</h2>
          <p>
            I am based in the United States and access support information there. Zoho Mail, OpenAI,
            and download providers may process data outside your province or country, including
            outside Canada and Quebec. Information may be accessible to authorities under local
            laws. Contact me with questions about international processing.
          </p>
          <p>
            Afterframe is for a general photography audience and is not directed at children.
            Optional OpenAI use is subject to its API account eligibility and guardian-consent
            requirements.
          </p>
        </section>
        <section id='changes'>
          <h2>Policy changes</h2>
          <p>
            Changes will be posted here with an updated effective date. Material changes will be
            communicated as required by applicable law, and new consent will be requested where
            required before changed processing begins.
          </p>
        </section>
      </article>
    </AfterframeLayout>
  );
}
