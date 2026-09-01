import { LegalPageLayout } from './LegalPageLayout'

/** Liability disclaimer copy, authored as JSX from the approved markdown. */
export function LiabilityDisclaimerPage() {
  return (
    <LegalPageLayout
      title="HPxShinez Detailz: Liability Disclaimer"
      description="Terms and liability limitations that apply when you book mobile auto detailing service with HPxShinez Detailz."
      path="/liability-disclaimer"
      effectiveDate="August 31, 2026"
    >
      <p>
        By booking a service with HPxShinez Detailz, the customer acknowledges
        and agrees to the following terms.
      </p>

      <h2>1. Pre-Existing Conditions</h2>
      <p>
        HPxShinez is not responsible for pre-existing damage, wear, stains,
        odors, or mechanical issues present on the vehicle before service begins
        (including but not limited to scratches, dents, upholstery tears,
        cracked trim, or electrical faults). Customers are encouraged to note
        any pre-existing damage before service starts. Photos may be taken
        before and after service for documentation purposes.
      </p>

      <h2>2. Customer Property and Valuables</h2>
      <p>
        Customers are responsible for removing all valuables, personal items,
        and sensitive documents from the vehicle prior to service. HPxShinez is
        not liable for the loss of, or damage to, personal items left in the
        vehicle.
      </p>

      <h2>3. Service Location Access</h2>
      <p>
        As a mobile service, HPxShinez requires reasonable access to water and a
        standard power outlet at the service location. If access is not
        available, some services may be limited, delayed, or rescheduled, and
        this does not constitute a failure of service on our part.
      </p>

      <h2>4. Weather and Scheduling</h2>
      <p>
        Outdoor services may be delayed or rescheduled due to weather conditions
        that would compromise the quality or safety of the work. We will make
        reasonable efforts to notify customers of any such changes as early as
        possible.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        HPxShinez performs services with reasonable care and skill. Except where
        caused by our gross negligence or intentional misconduct, HPxShinez is
        not liable for:
      </p>
      <ul>
        <li>Damage resulting from pre-existing vehicle conditions</li>
        <li>
          Mechanical or electrical issues unrelated to the detailing service
          performed
        </li>
        <li>
          Delays caused by circumstances outside our reasonable control
          (weather, denied site access, and similar events)
        </li>
      </ul>
      <p>
        Nothing in this disclaimer limits liability for damage caused by our own
        negligence in performing the service itself.
      </p>

      <h2>6. Contact Us</h2>
      <p>Questions about this disclaimer can be directed to:</p>
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
