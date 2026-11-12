import React from 'react';
import Link from 'next/link';
import AfterframeLayout from '../../components/afterframe/AfterframeLayout';
import classes from '../../components/afterframe/Afterframe.module.scss';

export default function Privacy() {
  return (
    <AfterframeLayout
      description='How Afterframe handles your photos, on-device data, optional OpenAI requests, support correspondence, and privacy choices.'
      page='privacy'
      title='Afterframe Privacy Policy'
    >
      <div>
        <h1>Afterframe Privacy Policy</h1>
        <div className={classes.draft}>
          <strong>Draft for review — not an effective policy.</strong> Release-specific controls,
          provider details, and support operations still need final confirmation and owner approval.
          An effective date will be added when approved. This preview is not ready for publication.
        </div>
      </div>
      <nav aria-label='On this page' className={classes.contents}>
        <h2>On this page</h2>
        <ul>
          <li>
            <a href='#publisher'>Who provides Afterframe</a>
          </li>
          <li>
            <a href='#photos'>Your photos and local data</a>
          </li>
          <li>
            <a href='#local'>On-device processing and downloads</a>
          </li>
          <li>
            <a href='#openai'>Optional OpenAI features</a>
          </li>
          <li>
            <a href='#credentials'>API keys and security</a>
          </li>
          <li>
            <a href='#support'>Support correspondence</a>
          </li>
          <li>
            <a href='#website'>Afterframe website pages</a>
          </li>
          <li>
            <a href='#retention'>Retention, deletion, and backups</a>
          </li>
          <li>
            <a href='#choices'>Your choices, requests, and rights</a>
          </li>
          <li>
            <a href='#international'>International processing and audience</a>
          </li>
          <li>
            <a href='#changes'>Policy changes</a>
          </li>
        </ul>
      </nav>
      <article aria-label='Privacy policy draft' className={classes.document}>
        <section id='publisher'>
          <h2>Who provides Afterframe</h2>
          <p>
            Afterframe is provided by <strong>Michael Barry McAndrews</strong>, an individual based
            in Newtown, Pennsylvania, United States, who is responsible for the publisher’s handling
            of personal information.
          </p>
          <p>
            For privacy questions, requests, or complaints, email{' '}
            <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a>.
          </p>
          <p>
            Mail: Michael Barry McAndrews, 161 Cliveden Dr., Newtown, PA 18940, United States.
            <br />
            Telephone: <a href='tel:+12155889243'>+1 (215) 588-9243</a>.
          </p>
        </section>
        <section id='photos'>
          <h2>Your photos and local data</h2>
          <p>
            Afterframe uses the photo access you grant to display photos, read available
            information, organize references into rolls, support search and analysis, and save
            metadata edits when you choose those actions. Available information can include photo
            identifiers, filenames, dimensions, dates, camera information, and location metadata.
            Limited or revoked access can restrict these features.
          </p>
          <p>
            Organizing a photo into a roll references its Apple Photos asset. That action does not
            itself duplicate the original or create an Apple Photos album. Roll organization is
            separate from explicitly saving metadata changes.
          </p>
          <p>
            Afterframe stores collection information, preferences, metadata drafts, photo
            descriptions, search representations, saved conversations, and execution/recovery
            information on your device. Recovery information can include previous and proposed
            metadata values and operation outcomes. Descriptions and conversations may contain
            information about you or people in your photos.
          </p>
          <p>
            Local storage is not limited to references. Metadata editing can create cached JPEG
            copies; cached images and derived data are separate from your originals in Apple Photos.
          </p>
        </section>
        <section id='local'>
          <h2>On-device processing and downloads</h2>
          <p>
            On-device analysis uses models and system features on your device rather than sending
            that analysis request to OpenAI. Availability depends on your device, software, and
            models.
          </p>
          <p>
            Some image-search models and supporting files download from Hugging Face and GitHub
            before running locally. These providers and their delivery infrastructure receive
            ordinary request information, including your IP address. Downloading a model is
            different from uploading photos for cloud analysis.
          </p>
          <p>
            Apple Photos and iCloud can also use network services according to your Apple settings.
            Choosing local analysis is not a promise that the app or operating system makes no
            network requests.
          </p>
          <p>
            Read the <a href='https://huggingface.co/privacy'>Hugging Face privacy policy</a> and{' '}
            <a href='https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'>
              GitHub privacy statement
            </a>
            .
          </p>
        </section>
        <section id='openai'>
          <h2>Optional OpenAI features</h2>
          <p>
            If you choose OpenAI processing, information is sent directly from your device to OpenAI
            using your own API key. Depending on the feature, this can include:
          </p>
          <ul>
            <li>
              <strong>Assistant requests:</strong> your messages, relevant conversation history,
              selected or relevant imagery, and tool information used to answer your request.
            </li>
            <li>
              <strong>Photo descriptions:</strong> photos submitted for description and instructions
              for describing them. Automatic preparation can process eligible imported photos
              without a separate Send action for each photo.
            </li>
            <li>
              <strong>Description search:</strong> description text and query text used to create
              numerical search representations called embeddings.
            </li>
          </ul>
          <p>
            Context and tool information can include photo and roll identifiers, filenames, dates,
            GPS coordinates, camera and lens details, film and exposure settings, roll names and
            membership, import status, descriptions, tags, proposed edits, and operation results.
            Requests are not necessarily limited to the photo attached to your latest message.
          </p>
          <p>
            Assistant, photo-description, and description-search providers are separate choices.
            Choosing a local assistant does not make all other features local. OpenAI API account
            charges are separate from your Afterframe purchase.
          </p>
          <p>
            The connection flow asks you to review a disclosure before connecting. Its
            authentication and fixed test request contact OpenAI and may incur API charges.
            Connecting does not itself select every cloud feature.
          </p>
          <p>
            OpenAI’s published API documentation says API content is not used for model training by
            default unless the account holder opts in. Default abuse-monitoring logs may retain
            content for up to 30 days, subject to documented legal, safety, and other exceptions.
            Retention varies by endpoint, feature, and account configuration. A request using{' '}
            <code>store: false</code> is not a guarantee of zero provider retention.
          </p>
          <p>
            See{' '}
            <a href='https://developers.openai.com/api/docs/guides/your-data'>
              OpenAI API data controls
            </a>
            , the <a href='https://openai.com/policies/services-agreement/'>Services Agreement</a>,
            and <a href='https://openai.com/policies/service-terms/'>Service Terms</a>. Deleting
            local conversations does not delete OpenAI’s records.
          </p>
        </section>
        <section id='credentials'>
          <h2>API keys and security</h2>
          <p>
            Your OpenAI API key is stored in the device Keychain and used to authenticate requests
            to OpenAI. You can remove the saved key through the app’s Connections settings. Removing
            it does not close your provider account, reverse charges, or erase previously processed
            data.
          </p>
          <p>
            Do not send API keys, passwords, or unnecessary private photographs to support. If a key
            is exposed, revoke it through your OpenAI account. No storage or transmission method can
            guarantee absolute security.
          </p>
        </section>
        <section id='support'>
          <h2>Support correspondence</h2>
          <p>
            When you email support, the publisher receives your email address, message, and
            attachments you choose to send. This information is used to answer questions,
            investigate problems, and handle privacy requests and complaints. Support email is
            handled through <strong>Zoho Mail</strong>.
          </p>
          <p>
            The proposed support policy is to remove correspondence and attachments from active
            support records no later than <strong>12 months after resolution</strong>, with earlier
            deletion when no longer needed. Narrow exceptions cover identified legal preservation
            duties or ongoing disputes; only necessary records are retained until the exception
            ends. You can request earlier deletion, subject to applicable exceptions.
          </p>
          <p>
            Delivery, recovery, and backup systems can retain copies separately from the active
            mailbox. Zoho documents administrator recovery of deleted messages for up to 25 days;
            that is not a promise of immediate erasure from every backup.
          </p>
          <p>
            See <a href='https://www.zoho.com/privacy.html'>Zoho’s privacy policy</a> and{' '}
            <a href='https://www.zoho.com/mail/help/adminconsole/troubleshooting.html#alink6'>
              email recovery information
            </a>
            . The retention workflow and final provider arrangements remain subject to confirmation
            before this draft takes effect.
          </p>
        </section>
        <section id='website'>
          <h2>Afterframe website pages</h2>
          <p>
            This website uses Amazon Web Services S3 and CloudFront. Hosting and delivery services
            process your IP address and ordinary request information to deliver pages and operate
            the service. Disabled customer access logging does not mean AWS performs no request or
            service processing.
          </p>
          <p>
            The site’s shared styles request Google Fonts, which sends request information to
            Google. The shared website code also enables Google Analytics in production; it is not
            enabled in this local preview. The deployed behavior, cookies, recipients, and retention
            must be confirmed before publication. This draft makes no site-wide “no tracking” claim.
          </p>
          <p>
            See the <a href='https://aws.amazon.com/privacy/'>AWS privacy notice</a> and{' '}
            <a href='https://policies.google.com/privacy'>Google privacy policy</a>.
          </p>
        </section>
        <section id='retention'>
          <h2>Retention, deletion, and backups</h2>
          <p>
            Collection, search, and history information has separate storage lifecycles. Removing a
            photo from a roll, deleting a conversation, clearing an image-search index, removing
            downloaded models, and revoking Photos access are not interchangeable actions.
          </p>
          <p>
            Conversation deletion is separate from recovery records for changes. Clearing the
            image-search index does not remove photo descriptions or downloaded models. Legacy
            records, cached images, and operating-system backups can remain separate from
            information visible in the app. This draft does not promise complete removal through any
            single control.
          </p>
          <p>
            Revoking access does not undo metadata edits already saved to Apple Photos. Deleting
            Afterframe information is not the same as deleting original photos, and deleting
            originals does not necessarily remove all derived app information.
          </p>
          <p>
            Downloaded search models are marked as excluded from device backup. Other data may be
            backed up depending on the operating system, settings, and storage configuration.
            Offloading an app, deleting it, Keychain storage, and restoring a backup have different
            effects; uninstalling is not presented here as guaranteed erasure.
          </p>
          <p>
            See <Link href='/afterframe/support#app-data'>Support</Link> for available controls and
            limitations. Release-specific deletion instructions remain under review.
          </p>
        </section>
        <section id='choices'>
          <h2>Your choices, requests, and rights</h2>
          <p>
            You can manage Photos permission in iOS Settings, choose on-device providers where
            supported, disconnect OpenAI, and delete saved conversations through the app’s supported
            controls. See <Link href='/afterframe/support'>Support and privacy choices</Link>.
          </p>
          <p>
            Email <a href='mailto:support@bmcandrews.com'>support@bmcandrews.com</a> to request
            access, correction, or deletion of personal information the publisher holds, withdraw
            consent where applicable, or raise a complaint. Depending on applicable law, you may
            have a right to receive computerized personal information you provided in a structured,
            commonly used format. Rights have legal limits and exceptions.
          </p>
          <p>
            Describe the information and request concerned. Only information reasonably necessary to
            verify and answer a request will be requested. Applicable Canadian access-request laws
            generally require a response within 30 days, subject to lawful extensions or other
            applicable rules. Any applicable extension or refusal must explain the reason and
            available review or complaint route. General support has no promised response-time
            guarantee.
          </p>
          <p>
            The publisher cannot remotely inspect or erase information held only on your device
            because you send an email. He can address support records he holds. Apple or OpenAI
            account requests may also require action through those providers, without removing the
            publisher’s responsibilities for information he handles.
          </p>
          <p>
            You may contact the{' '}
            <a href='https://www.priv.gc.ca/en/report-a-concern/'>
              Office of the Privacy Commissioner of Canada
            </a>
            , the{' '}
            <a href='https://www.cai.gouv.qc.ca/'>Commission d’accès à l’information du Québec</a>,
            or the applicable provincial regulator, including{' '}
            <a href='https://oipc.ab.ca/'>Alberta</a> and{' '}
            <a href='https://www.oipc.bc.ca/'>British Columbia</a>.
          </p>
        </section>
        <section id='international'>
          <h2>International processing and audience</h2>
          <p>
            The publisher is in the United States and accesses support information there. External
            providers may process information outside your province or country, including outside
            Quebec and Canada, where local courts and authorities may have access under their laws.
            Contact support with questions about international handling.
          </p>
          <p>
            Afterframe is intended for a general photography audience, not specifically for
            children. Optional OpenAI use is subject to the provider’s API account terms, including
            applicable guardian-consent requirements. This is not a declaration of a new minimum app
            age.
          </p>
        </section>
        <section id='changes'>
          <h2>Policy changes</h2>
          <p>
            The approved policy will carry an effective date. Material changes will be communicated
            as required by applicable law, and new consent will be requested where required before
            changed processing begins. This preview has not taken effect.
          </p>
        </section>
      </article>
    </AfterframeLayout>
  );
}
