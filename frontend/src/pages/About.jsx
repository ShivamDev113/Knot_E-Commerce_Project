import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

gsap.registerPlugin(ScrollTrigger)

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="float-shape absolute top-10 right-8 w-56 h-56 opacity-[0.05]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="65" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="5 5" />
    </svg>
    <svg className="float-shape absolute top-1/2 left-4 w-32 h-32 opacity-[0.06]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="2" />
      <polygon points="50,25 75,50 50,75 25,50" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </svg>
    <svg className="float-shape absolute bottom-32 right-16 w-40 h-40 opacity-[0.04]" viewBox="0 0 100 100">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={12.5 + c * 25} cy={12.5 + r * 25} r="2" fill="#c9a96e" />
        ))
      )}
    </svg>
    <svg className="float-shape absolute bottom-16 left-1/3 w-20 h-20 opacity-[0.05]" viewBox="0 0 100 100">
      <line x1="50" y1="0" x2="50" y2="100" stroke="#c9a96e" strokeWidth="1" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#c9a96e" strokeWidth="1" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
    </svg>
  </div>
)

const pillarData = [
  {
    label: 'Quality Assurance',
    text: 'At KNOT, quality isn\'t a checkbox — it\'s our foundation. Every garment goes through a meticulous process of selection, stitching, and inspection to ensure superior durability and finish.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    label: 'Convenience',
    text: 'Your comfort goes beyond what you wear. From effortless browsing to smooth checkout and timely delivery, we\'ve designed every step to be simple, seamless, and satisfying.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    label: 'Exceptional Customer Service',
    text: 'At KNOT, every customer is a part of our story. Our dedicated support team is always ready to help — whether it\'s sizing guidance, styling suggestions, or quick order resolutions.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
]

const About = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.float-shape').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 3 === 0 ? 12 : -12,
          rotation: i % 2 === 0 ? 10 : -10,
          duration: 5 + i,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5,
        })
      })

      gsap.fromTo('.about-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo('.about-image-wrap',
        { opacity: 0, scale: 0.94, x: -50 },
        {
          opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-image-wrap', start: 'top 78%' }
        }
      )

      gsap.fromTo('.story-para',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-para', start: 'top 82%' }
        }
      )

      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.pillars-section', start: 'top 78%' }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0d0d0d] text-[#e8e0d0] overflow-hidden">
      <FloatingShapes />

      {/* ── Header ── */}
      <div className="relative pt-16 sm:pt-20 pb-8 sm:pb-10 text-center border-b border-white/10">
        <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-[#c9a96e] mb-3 sm:mb-4">
          Our Story
        </span>
        <h1 className="about-heading font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
          About <span className="text-[#c9a96e] italic">Us</span>
        </h1>
        <div className="mt-4 w-16 h-px bg-[#c9a96e] mx-auto opacity-60" />
      </div>

      {/* ── Story Section ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Image — full-width on mobile, half on desktop */}
          <div className="about-image-wrap w-full lg:w-1/2 flex-shrink-0">
            {/* Decorative shadow offset layer */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c9a96e]/20 to-transparent translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={assets.about_img}
                  alt="About KNOT"
                  className="w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover object-center block"
                />
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 sm:gap-6 mt-4 lg:mt-0">
            <p className="story-para text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-bold">
              Who We Are
            </p>
            <p className="story-para text-white/80 text-sm sm:text-base leading-relaxed">
              At <span className="text-white font-semibold">KNOT</span>, we believe that clothing is more than just fabric — it's a reflection of personality, confidence, and comfort woven together. Founded with a passion for timeless design and everyday wearability, KNOT stands for the bond between style and simplicity. Every stitch, every thread, and every pattern tells a story of craftsmanship, precision, and care.
            </p>
            <p className="story-para text-white/60 text-sm sm:text-base leading-relaxed">
              Our vision is to create apparel that connects people through shared values — quality, authenticity, and effortless expression. Whether it's the relaxed fit of our casuals or the refined touch of our formals, each KNOT piece is crafted to make you feel confident in your own skin.
            </p>
            <p className="story-para text-white/60 text-sm sm:text-base leading-relaxed">
              We take pride in working with skilled artisans and using high-grade, ethically sourced materials that stand the test of time. KNOT isn't just about fashion — it's about forming connections. It's about tying together passion, people, and purpose into one seamless experience.
            </p>
            <p className="story-para text-white/50 text-sm sm:text-base italic border-l-2 border-[#c9a96e]/40 pl-4">
              Welcome to <span className="text-[#c9a96e] not-italic font-semibold">KNOT</span> — where every thread ties you closer to who you are.
            </p>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="pillars-section relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
            Our Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
            Why Choose <span className="text-[#c9a96e] italic">Us</span>
          </h2>
          <div className="mt-4 w-12 h-px bg-[#c9a96e]/60 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillarData.map((p, i) => (
            <div
              key={i}
              className="pillar-card group relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8
                backdrop-blur-sm hover:border-[#c9a96e]/50 hover:bg-white/[0.08]
                hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/0 to-[#c9a96e]/5
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#c9a96e]/15 flex items-center justify-center
                  text-[#c9a96e] mb-4 sm:mb-5 group-hover:bg-[#c9a96e]/25 transition-colors duration-300">
                  {p.icon}
                </div>
                <h3 className="text-white font-serif font-medium text-base sm:text-lg mb-2 sm:mb-3">{p.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="relative border-t border-white/10">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default About