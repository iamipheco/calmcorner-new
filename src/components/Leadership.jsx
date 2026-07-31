import { useState } from 'react'
import { Linkedin, Facebook, UserRound } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import WaveDivider from './WaveDivider'

const LEADERS = [
  {
    tag: 'Founder & CEO',
    name: 'Ekenedilichukwu Kennedy Udemezue',
    role: 'MD & Chief Executive Officer',
    photo: '/images/team/ceo.jpg',
    bio: "As Managing Director & Chief Executive Officer of Calmcorner Homes & Properties Ltd, Kennedy provides the strategic direction that drives the company's growth and long-term vision. Passionate about transforming the real estate experience, he is committed to building a company founded on trust, transparency, and lasting value. His leadership focuses on creating opportunities that help clients invest with confidence while positioning Calmcorner as a trusted name in the industry.",
    quote: "Building trust through every property investment.",
    socials:{linkedin:'#',x:'#',facebook:'#'}
  },
  {
    tag:'Co-Founder & COO',
    name:'Anyaefiena Ifechukwu Mathias',
    role:'Director & Chief Operating Officer',
    photo:'/images/team/coo.jpg',
    bio:"As Director and Chief Operating Officer, Ifechukwu oversees the operational excellence that powers Calmcorner's day-to-day success. He leads the execution of the company's vision by ensuring seamless service delivery, efficient processes, and an exceptional client experience. His dedication to quality, accountability, and continuous improvement helps transform every client interaction into a trusted partnership.",
    quote:"Operational excellence is the foundation of lasting client confidence.",
    socials:{linkedin:'#',x:'#',facebook:'#'},
    reverse:true
  }
]

function XIcon(props){
 return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.6 10.6 20.4 3h-1.6l-5.9 6.6L8.2 3H3l7.1 10.1L3 21h1.6l6.2-7 5 7H21l-7.4-10.4Zm-2.2 2.5-.7-1L5 4.2h2.2l4.6 6.5.7 1 6 8.4h-2.2l-4.9-6.9Z"/></svg>
}

function LeaderPhoto({photo,name}){
 const [errored,setErrored]=useState(false)
 if(errored){
   return <div className="w-full aspect-[4/5] rounded-[22px] bg-ink-soft flex items-center justify-center"><UserRound className="w-16 h-16 text-lime"/></div>
 }
 return <img src={photo} alt={name} onError={()=>setErrored(true)} className="w-full aspect-[4/5] rounded-[22px] object-cover object-center shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"/>
}

export default function Leadership({dividerFill}){
 return (
<section className="relative overflow-hidden bg-ink py-16 md:py-28 text-white">
<div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-lime/5 blur-3xl"/>
<div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-lime/5 blur-3xl"/>
<div className="container-custom relative z-10">
<SectionHeading eyebrow="Leadership" title="Meet the Founders" lede="Driven by integrity, innovation, and a shared commitment to excellence, our founders are dedicated to making property ownership transparent, secure, and rewarding." light/>
<div>
{LEADERS.map(l=>(
<div key={l.name} className="py-16 md:py-20">
<div className={`grid items-center gap-12 lg:gap-20 md:grid-cols-2 ${l.reverse?'md:[&>*:first-child]:order-2':''}`}>
<Reveal><div className="group relative mx-auto max-w-md md:max-w-none"><div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm"><LeaderPhoto photo={l.photo} name={l.name}/></div><div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-lime/10 blur-2xl"/></div></Reveal>
<Reveal delay={0.1}>
<span className="mb-5 inline-flex items-center rounded-full border border-lime/20 bg-lime/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">{l.tag}</span>
<h3 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">{l.name}</h3>
<p className="mb-6 mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-lime">{l.role}</p>
<p className="max-w-xl text-base leading-8 text-white/65 md:text-lg">{l.bio}</p>
<div className="mt-8 border-l-2 border-lime pl-5"><p className="italic text-white/45">"{l.quote}"</p></div>
<div className="mt-8 flex gap-3">
{[['linkedin',Linkedin],['x',XIcon],['facebook',Facebook]].map(([k,Icon])=><a key={k} href={l.socials[k]} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-lime hover:text-ink hover:shadow-lg"><Icon className="h-4 w-4"/></a>)}
</div>
</Reveal>
</div>
</div>
))}
</div>
</div>
{dividerFill && <WaveDivider fill={dividerFill}/>}
</section>)
}