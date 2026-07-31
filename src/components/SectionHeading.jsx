import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, lede, light = false, center = false }) {
  return (
    <Reveal className={`max-w-2xl mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</span>
      <h2 className={`mt-3.5 text-4xl md:text-5xl ${light ? 'text-white' : ''}`}>{title}</h2>
      {lede && <p className={`mt-3.5 md:text-lg ${light ? 'text-white/70' : 'text-muted'}`}>{lede}</p>}
    </Reveal>
  )
}
