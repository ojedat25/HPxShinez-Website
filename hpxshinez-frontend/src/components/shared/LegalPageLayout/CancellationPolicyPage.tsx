import { LegalPageLayout } from './LegalPageLayout'

/** Cancellation policy copy, authored as JSX from the approved markdown. */
export function CancellationPolicyPage() {
  return (
    <LegalPageLayout
      title="HPxShinez Detailz: Cancellation Policy"
      description="Rescheduling and cancellation terms for mobile auto detailing appointments booked with HPxShinez Detailz."
      path="/cancellation-policy"
      effectiveDate="August 31, 2026"
    >
      <p>
        By booking an appointment with HPxShinez Detailz, you agree to the
        following cancellation terms.
      </p>

      <h2>1. Cancellation Window</h2>
      <p>
        We ask that you please reschedule or cancel at least 6 hours before the
        beginning of your appointment.
      </p>

      <h2>2. Late Cancellations and No-Shows</h2>
      <p>
        As a mobile service, late cancellations affect our ability to serve
        other clients in your area that day. Repeated no-shows or last-minute
        cancellations may require prepayment for future bookings.
      </p>

      <h2>3. How to Cancel or Reschedule</h2>
      <p>
        Appointments can be canceled or rescheduled online at least 6 hours in
        advance of the scheduled time, or by contacting us directly using the
        information below.
      </p>

      <h2>4. Contact Us</h2>
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
