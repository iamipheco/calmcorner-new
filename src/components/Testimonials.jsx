import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Users, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";

const TESTIMONIALS=[
{name:"Adaeze O.",initials:"AO",role:"Land Buyer",location:"Asaba",quote:"Calmcorner walked me through everything before I paid a single naira. I finally understood what I was buying instead of just hoping for the best."},
{name:"Emeka N.",initials:"EN",role:"Prospective Homeowner",location:"Awka",quote:"What I appreciated most was how reachable they were. Every question I had on WhatsApp got answered the same day."},
{name:"Ifeoma T.",initials:"IT",role:"Investor",location:"Lagos",quote:"As someone buying from outside the state, I needed people I could trust. Calmcorner made that possible."}
];

const stats=[
{icon:Star,value:"4.9",label:"Average Rating"},
{icon:Users,value:"100+",label:"Happy Clients"},
{icon:ShieldCheck,value:"98%",label:"Recommend Us"}
];

function PreviewCard({item}){
return(
<div className="w-56 rounded-3xl bg-white/70 backdrop-blur border border-line p-6 opacity-70 hover:opacity-100 transition">
<div className="flex gap-1 mb-3">{[...Array(5)].map((_,i)=><Star key={i} className="w-4 h-4 fill-lime-500 text-lime-500"/>)}</div>
<p className="text-sm text-muted line-clamp-4">"{item.quote}"</p>
<div className="mt-5 flex items-center gap-3">
<div className="w-11 h-11 rounded-full bg-lime-200 flex items-center justify-center font-bold">{item.initials}</div>
<div><p className="font-semibold">{item.name}</p><p className="text-xs text-muted">{item.role}</p></div>
</div>
</div>);
}

export default function Testimonials({dividerFill="#F7F4EF"}){
const [active,setActive]=useState(0);
const prev=(active-1+TESTIMONIALS.length)%TESTIMONIALS.length;
const next=(active+1)%TESTIMONIALS.length;
useEffect(()=>{const t=setInterval(()=>setActive(v=>(v+1)%TESTIMONIALS.length),6000);return()=>clearInterval(t)},[]);
const item=TESTIMONIALS[active];
return(
<section className="relative py-4 lg:py-12 pb-15 md:pb-28 overflow-hidden" style={{background:"#F7F4EF"}}>
<div className="absolute top-20 left-0 lg:left-10 w-72 h-72 rounded-full bg-lime-300/20 blur-3xl"/>
<div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lime-400/10 blur-3xl"/>
<div className="container-custom relative z-10 px-5 sm:px-6 lg:px-0">
<Reveal className="text-center max-w-3xl mx-auto">
<span className="eyebrow">WHAT CLIENTS SAY</span>
<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Trusted by Families & Investors</h2>
<p className="mt-4 text-muted">Real experiences from people who trusted Calmcorner with their property investments.</p>
</Reveal>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-14">
{stats.map(s=><div key={s.label} className="bg-white rounded-2xl p-5 sm:p-6 border border-line text-center shadow-sm"><s.icon className="mx-auto w-8 h-8 text-lime-600"/><h3 className="text-3xl font-bold mt-3">{s.value}</h3><p className="text-muted">{s.label}</p></div>)}
</div>

<div className="flex items-center justify-center gap-6">
<div className="hidden lg:block"><PreviewCard item={TESTIMONIALS[prev]}/></div>

<div className="w-full max-w-4xl">
<AnimatePresence mode="wait">
<motion.div key={active} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.35}}
className="relative bg-white rounded-[28px] lg:rounded-[34px] border border-line shadow-xl p-6 sm:p-8 lg:p-12">
<Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-lime-200"/>
<div className="flex gap-1 mb-6 md:mb-16">{[...Array(5)].map((_,i)=><Star key={i} className="w-5 h-5 fill-lime-500 text-lime-500"/>)}</div>
<p className="text-base sm:text-lg lg:text-xl leading-8 lg:leading-9 text-slate-700">"{item.quote}"</p>
<div className="mt-8 flex items-center gap-4">
<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-lime-200 flex items-center justify-center font-bold text-lg sm:text-xl">{item.initials}</div>
<div><h4 className="font-semibold text-lg sm:text-xl">{item.name}</h4><p className="text-muted">{item.role} • {item.location}</p></div>
</div>
</motion.div>
</AnimatePresence>

<div className="flex justify-center gap-2 mt-8">{TESTIMONIALS.map((_,i)=><button key={i} onClick={()=>setActive(i)} className={`w-3 h-3 rounded-full ${i===active?"bg-lime-600":"bg-gray-300"}`}/>)}</div>
<div className="flex justify-center gap-3 mt-6">
<button onClick={()=>setActive(prev)} className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center"><ChevronLeft/></button>
<button onClick={()=>setActive(next)} className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center"><ChevronRight/></button>
</div>
</div>

<div className="hidden lg:block"><PreviewCard item={TESTIMONIALS[next]}/></div>
</div>
</div>
{dividerFill&&<WaveDivider fill={dividerFill}/>}
</section>);
}
