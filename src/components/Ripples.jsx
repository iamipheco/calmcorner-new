import { motion } from 'framer-motion'

/**
 * The recurring "calm ripple" motif — a visual nod to the brand name
 * and the promise of peace of mind. Rings gently pulse and rotate.
 */
export function HeroRipples({ className = '' }) {
  const rings = [
    { r: 60, opacity: 0.9 },
    { r: 130, opacity: 0.6 },
    { r: 200, opacity: 0.38 },
    { r: 270, opacity: 0.22 },
    { r: 308, opacity: 0.1 },
  ]
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 620 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
    >
      {rings.map((ring, i) => (
        <motion.circle
          key={ring.r}
          cx="310"
          cy="310"
          r={ring.r}
          stroke="#8CD300"
          strokeWidth="1.5"
          initial={{ opacity: ring.opacity }}
          animate={{ opacity: [ring.opacity, ring.opacity * 1.6, ring.opacity] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </motion.svg>
  )
}

export function CardRipples({ className = '' }) {
  const rings = [
    { r: 30, opacity: 0.9 },
    { r: 65, opacity: 0.65 },
    { r: 105, opacity: 0.42 },
    { r: 148, opacity: 0.22 },
  ]
  return (
    <motion.svg
      className={className}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: -360 }}
      transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
    >
      {rings.map((ring) => (
        <circle key={ring.r} cx="150" cy="150" r={ring.r} stroke="#8CD300" strokeWidth="1.4" opacity={ring.opacity} />
      ))}
    </motion.svg>
  )
}
