// Single source of truth for contact details used across the site.
// Update these once here and every page/button picks up the change.

export const SITE = {
  companyName: 'Calmcorner Homes and Properties Ltd',
  slogan: '...Your peaceful path to property ownership',
  whatsappNumber: '2348143930521', // digits only, no + or spaces
  phones: [
    { display: '0814 393 0521', href: '+2348143930521' },
    { display: '0802 490 9811', href: '+2348024909811' },
  ],
  emails: ['info@calmcornerproperties.ng', 'calmcornerproperties@gmail.com'],
  address: {
    line1: 'No 48 Amaechi Iyoh',
    line2: 'Opposite De Echo Exclusive Lounge & Restaurant',
    line3: 'Asaba, Delta State',
  },
  domain: 'https://calmcornerproperties.ng',
  socials: [
    { name: 'TikTok', url: 'https://tiktok.com/@calmcornerproperties' },
    { name: 'X', url: 'https://x.com/calmcornerprops' },
    { name: 'Instagram', url: 'https://instagram.com/calmcornerproperties' },
    { name: 'Facebook', url: 'https://facebook.com/calmcornerproperties' },
  ],
}

export function waLink(message) {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
