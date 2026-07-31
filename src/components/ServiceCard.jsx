import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group flex flex-col bg-white rounded-2xl border border-line p-7 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-lime-deep/30"
    >
      <div className="w-14 h-14 rounded-full bg-lime-soft text-lime-deep flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm mb-5 flex-1">{description}</p>
      <span className="inline-flex items-center gap-1.5 font-bold text-sm text-lime-deep">
        Learn More
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
