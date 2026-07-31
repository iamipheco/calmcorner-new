import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileCheck2, ScrollText, WalletCards, Mountain,
  Route, Droplets, Zap, ShieldCheck
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WaveDivider from "./WaveDivider";
import { FEATURED_ESTATES } from "../data/estates";
import { waLink } from "../siteConfig";

const icons={
  survey:FileCheck2,deed:ScrollText,payment:WalletCards,land:Mountain,
  road:Route,water:Droplets,power:Zap,security:ShieldCheck
};

export default function FeaturedProperties({dividerFill}){
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const timer=useRef();

  useEffect(()=>{
    if(paused||FEATURED_ESTATES.length<2) return;
    timer.current=setInterval(()=>setActive(i=>(i+1)%FEATURED_ESTATES.length),6000);
    return()=>clearInterval(timer.current);
  },[paused]);

  const estate=FEATURED_ESTATES[active];

  return (
    <section className="relative bg-white py-24">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Featured Investment"
          title="Discover Our Latest Estates"
          lede="Discover secure property investments backed by transparency and peace of mind."
        />

        <div className="mx-auto max-w-[1120px]" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
          <Reveal>
            <div className="overflow-hidden rounded-[34px] border border-line bg-white shadow-[0_25px_70px_rgba(0,0,0,.12)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={estate.slug}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:-20}}
                  transition={{duration:.45}}
                  className="grid lg:grid-cols-[42%_58%]"
                >
                  <div className="relative flex h-[720px] items-center justify-center overflow-hidden border-r border-line bg-neutral-100">
                    <img src={estate.image} alt={estate.name} className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]" />
                    <span className="absolute left-6 top-6 rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase">{estate.tag}</span>
                  </div>

                  <div className="flex h-[720px] flex-col justify-center bg-stone-50 p-16 xl:p-20">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-lime-deep">{estate.location}</p>
                    <h2 className="mt-3 max-w-md text-5xl font-bold leading-tight">{estate.name}</h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{estate.description}</p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {estate.highlights.slice(0,8).map(item=>{
                        const Icon=icons[item.icon]||FileCheck2;
                        return (
                          <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-sm">
                            <Icon className="h-5 w-5 text-lime"/>
                            <span className="text-sm">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href={waLink(estate.whatsappMessage)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">Book Inspection</a>
                      <Link to={`/properties/${estate.slug}`} className="btn btn-outline-dark">Send an Enquiry</Link>
                      <Link to="/properties" className="btn btn-lime">Explore More →</Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <div className="mt-8 flex justify-center gap-3">
            {FEATURED_ESTATES.map((e,i)=>(
              <button key={e.slug} onClick={()=>setActive(i)} className={i===active?"h-1.5 w-16 rounded-full bg-lime":"h-1.5 w-8 rounded-full bg-neutral-300"} />
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fill={dividerFill}/>
    </section>
  );
}