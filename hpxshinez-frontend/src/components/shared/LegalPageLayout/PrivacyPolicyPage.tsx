import { LegalPageLayout } from './LegalPageLayout'

/** Privacy policy copy, authored as JSX from the approved markdown. */
export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="HPxShinez Detailz: Privacy Policy"
      description="How HPxShinez Detailz collects and uses information when you book mobile auto detailing in the Twin Cities metro."
      path="/privacy-policy"
      effectiveDate="August 31, 2026"
    >
      <p>
        HPxShinez Detailz ("HPxShinez," "we," "us," "our") is a mobile auto
        detailing business operated as a sole proprietorship, serving
        Minneapolis, Columbia Heights, Fridley, Coon Rapids, St. Anthony, St.
        Paul, Edina, and Richfield, Minnesota. This policy explains what
        information we collect through hpxshinez.com and how it is used.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        hpxshinez.com does not host a booking form directly. The "Book Now"
        button redirects you to a booking page hosted by Square, Inc., where you
        provide:
      </p>
      <ul>
        <li>Name, phone number, and email address</li>
        <li>
          Service address (the location where detailing service will be
          performed)
        </li>
        <li>Vehicle information and selected services</li>
        <li>
          Appointment date, time, and any notes you provide at booking
        </li>
      </ul>
      <p>
        This information is submitted to and stored by Square, not to
        HPxShinez's own servers, since hpxshinez.com does not run a booking form
        itself.
      </p>
      <p>
        We do not collect payment card information directly. If you choose to
        pay through Square, that payment is processed entirely by Square, Inc.
        Services may also be paid for by cash, Zelle, or Cash App, arranged
        directly between you and HPxShinez outside of the website; these payment
        methods are not processed, recorded, or stored through hpxshinez.com or
        Square.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        Information collected through the Square booking page is used only to:
      </p>
      <ul>
        <li>
          Schedule, confirm, and provide the detailing services you request
        </li>
        <li>
          Communicate with you about your appointment (confirmations, reminders,
          and rescheduling)
        </li>
        <li>Maintain basic business records</li>
      </ul>
      <p>
        We do not sell, rent, or share your personal information with third
        parties for marketing purposes.
      </p>

      <h2>3. Third-Party Service Providers</h2>
      <p>
        Booking is handled entirely on a page hosted by Square, Inc., which you
        reach by clicking the "Book Now" link on our site. Once you leave
        hpxshinez.com for the Square booking page, your information is governed
        by{' '}
        <a href="https://squareup.com/us/en/legal/general/privacy">
          Square's Privacy Policy
        </a>, not by this one. Square is a separate data controller for the booking
        and payment functions it provides; HPxShinez does not have access to,
        and does not store, your payment card details.
      </p>
      <p>
        For services paid by cash, Zelle, or Cash App, no payment information
        passes through hpxshinez.com or Square at all; those arrangements are
        made directly between you and HPxShinez.
      </p>

      <h2>4. Cookies and Tracking</h2>
      <p>
        The HPxShinez website itself does not use analytics software or tracking
        cookies, and does not embed any third-party booking widget on its pages.
        Once you click through to the Square-hosted booking page, cookies and
        tracking on that page are governed by Square's privacy policy, not this
        one.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Booking and contact information is retained only as long as necessary
        for scheduling, service delivery, and basic business recordkeeping, and
        is deleted upon request where we are not required to retain it for tax
        or legal purposes.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable steps to protect information provided to us. No
        method of electronic storage or transmission is completely secure, and
        we cannot guarantee absolute security.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        This site is not directed to individuals under the age of 13, and we do
        not knowingly collect information from children.
      </p>

      <h2>8. Your Privacy Rights</h2>
      <p>
        Depending on where you live, you may have the right to request access
        to, correction of, or deletion of the personal information we hold about
        you. To make such a request, contact us using the information below. We
        will respond within a reasonable time.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The effective date at the
        top of this page reflects the most recent revision.
      </p>

      <h2>10. Contact Us</h2>
      <p>Questions about this policy can be directed to:</p>
      <p>
        <strong>HPxShinez Detailz</strong>
        <br />
        <a href="mailto:HPxShinez@gmail.com">HPxShinez@gmail.com</a>
        <br />
        <a href="tel:+17633311933">(763) 331-1933</a>
      </p>
    </LegalPageLayout>
  )
}
