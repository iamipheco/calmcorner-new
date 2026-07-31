import { SITE } from '../siteConfig'

const ICONS = {
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.6h-3.16v13.3c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1 0-5.8c.3 0 .58.04.85.12V9.6a6.1 6.1 0 0 0-.85-.06 6.06 6.06 0 1 0 6.06 6.06V8.9a7.6 7.6 0 0 0 4.6 1.55V7.3c-1.05 0-2.03-.34-2.9-.94z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
      <path d="M13.6 10.6 20.4 3h-1.6l-5.9 6.6L8.2 3H3l7.1 10.1L3 21h1.6l6.2-7 5 7H21l-7.4-10.4Zm-2.2 2.5-.7-1L5 4.2h2.2l4.6 6.5.7 1 6 8.4h-2.2l-4.9-6.9Z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46C16.24 4.4 15.35 4.3 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.34H8.05v2.96H10.6V21h2.9Z" />
    </svg>
  ),
}

export default function Socials({ variant = 'dark' }) {
  const isLight = variant === 'light'
  return (
    <div className="flex items-center gap-3">
      {SITE.socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isLight
              ? 'bg-ink/5 text-ink hover:bg-lime hover:text-ink'
              : 'bg-white/10 text-white/80 hover:bg-lime hover:text-ink'
          }`}
        >
          {ICONS[s.name]}
        </a>
      ))}
    </div>
  )
}
