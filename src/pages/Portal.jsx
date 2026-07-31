import ComingSoon from '../components/ComingSoon'

export default function Portal() {
  return (
    <ComingSoon
      eyebrow="Coming soon"
      title="The Calmcorner Client Portal"
      lede="Secure your property, track payments, and manage documentation online — all from one account. The portal isn't live yet, but you can join the waitlist to be first in when it opens."
      whatsappMessage="Hello Calmcorner, I'd like to buy a property. Please help me get started."
      roleOptions={['Buying for myself', 'Buying for my family', 'Buying as an investment']}
    >
      <span className="eyebrow">What&rsquo;s coming</span>
      <h2 className="mt-3.5">Everything after &ldquo;yes,&rdquo; in one place</h2>
      <ul className="feature-list grid gap-3.5 mt-6">
        <li>Log in to secure a plot and track your purchase status</li>
        <li>Pay in full or by installment, with a clear record every time</li>
        <li>Access your documentation whenever you need it, without waiting on anyone</li>
      </ul>
      <p className="text-muted mt-6">In the meantime, our team can walk you through a purchase directly — just reach out on WhatsApp.</p>
    </ComingSoon>
  )
}
