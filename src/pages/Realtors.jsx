import ComingSoon from '../components/ComingSoon'

export default function Realtors() {
  return (
    <ComingSoon
      eyebrow="Coming soon"
      title="The Calmcorner Realtor Network"
      lede="A dedicated portal for registered realtors to list, refer and track deals with Calmcorner — all in one place. It's not live yet, but you can join the waitlist to be first in when it opens."
      whatsappMessage="Hello Calmcorner, I'm a realtor interested in the Realtor Network. Please let me know when it's live."
      roleOptions={['Independent realtor', 'Agency / brokerage', 'Referral partner', 'Other']}
    >
      <span className="eyebrow">What&rsquo;s coming</span>
      <h2 className="mt-3.5">Built for realtors who move property</h2>
      <ul className="feature-list grid gap-3.5 mt-6">
        <li>Register once and get access to Calmcorner&rsquo;s available listings</li>
        <li>Track your referrals, leads and closed deals in one dashboard</li>
        <li>See commission status without having to chase anyone for updates</li>
      </ul>
    </ComingSoon>
  )
}
