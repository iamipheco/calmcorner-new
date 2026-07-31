import { motion } from 'framer-motion'
import { waLink } from '../siteConfig'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-lime text-ink flex items-center justify-center shadow-[0_8px_24px_rgba(10,18,32,0.28)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.31.63 4.474 1.727 6.33L3 29l7.36-2.163A12.44 12.44 0 0 0 16.001 28C22.895 28 28.5 22.393 28.5 15.5S22.895 3 16.001 3zm7.29 17.61c-.31.87-1.55 1.63-2.53 1.84-.67.14-1.55.25-4.5-.97-3.78-1.57-6.22-5.4-6.41-5.65-.19-.25-1.53-2.04-1.53-3.89s.97-2.76 1.32-3.14c.31-.34.68-.42.9-.42.23 0 .45.002.65.011.21.01.49-.08.76.58.31.75 1.05 2.6 1.14 2.79.09.19.15.42.03.67-.12.25-.18.4-.36.62-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.89 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.09.99 2.45 1.17.36.18.6.27.69.42.09.15.09.86-.22 1.73z" />
      </svg>
    </motion.a>
  )
}
