import logoIcon from '../assets/logo-icon.png'
import logoIconDark from '../assets/logo-icon-dark.png'

const POSITIONS = {
  'top-right': '-right-16 -top-16',
  'bottom-left': '-left-16 -bottom-16',
  'bottom-right': '-right-16 -bottom-16',
  'top-left': '-left-16 -top-16',
}

/**
 * Large, faint logo mark used as a background watermark — decorative
 * only, never the focal point. Pass `dark` when the section itself has
 * a dark background (picks the plain lime mark instead of the
 * black+lime one, which needs a light background to read well).
 * Add `relative overflow-hidden` to the parent section for this to sit
 * correctly (same requirement as WaveDivider).
 */
export default function Watermark({ dark = false, position = 'top-right', size = 'w-600', rotate = 'rotate-12' }) {
  return (
    <img
      src={dark ? logoIcon : logoIconDark}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute ${POSITIONS[position]} ${size} ${rotate} opacity-[0.05]`}
    />
  )
}
