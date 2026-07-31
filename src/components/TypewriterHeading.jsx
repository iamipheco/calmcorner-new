import { useTypewriter } from '../hooks/useTypewriter'

export default function TypewriterHeading({ text, className = '', speed = 26, startDelay = 150 }) {
  const output = useTypewriter(text, { speed, startDelay })
  const done = output.length === text.length

  return (
    <h1 className={className}>
      {output}
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] md:w-[4px] h-[0.85em] bg-lime ml-1 align-middle ${
          done ? 'animate-pulse' : ''
        }`}
      />
    </h1>
  )
}
