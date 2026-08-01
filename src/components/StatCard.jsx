import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, value, label, dark = true }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group p-6 rounded-xl border transition-colors ${
        dark ? 'border-white/15 hover:border-lime/50 hover:bg-white/5' : 'border-line hover:border-lime-deep/40 hover:bg-lime-soft/40'
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
          dark ? 'bg-lime/15 text-lime' : 'bg-lime-soft text-lime-deep'
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={2} />
      </motion.div>
      <span className={`font-display text-xl sm:text-2xl md:text-3xl font-semibold block leading-tight ${dark ? 'text-lime' : 'text-ink'}`}>
        {value}
      </span>
      <span className={`text-sm mt-1.5 block ${dark ? 'text-white/60' : 'text-muted'}`}>{label}</span>
    </motion.div>
  )
}
