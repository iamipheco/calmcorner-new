/**
 * A wave-shaped divider used between sections instead of a hard edge.
 * Place it absolutely at the bottom of a section; `fill` should match
 * the background color of the section that comes NEXT, so the wave
 * reads as the next section curving up into this one.
 */
export default function WaveDivider({ fill = '#FFFFFF', flip = false, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 w-full overflow-hidden leading-none pointer-events-none ${
        flip ? 'top-0 -translate-y-[1px] rotate-180' : 'bottom-0 translate-y-[1px]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        className="block w-full h-14 md:h-24"
        preserveAspectRatio="none"
      >
        <path
          fill={fill}
          d="M0,64L80,58.7C160,53.3,320,42.7,480,48C640,53.3,800,74.7,960,80C1120,85.3,1280,74.7,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </div>
  )
}
