import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets } from '../assets/assets'

gsap.registerPlugin(ScrollTrigger)

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange',
    description: 'Hassle-free exchanges with no questions asked — swap styles effortlessly.',
    accent: '↔',
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Returns',
    description: 'Full refund within 7 days, no strings attached. Your satisfaction is guaranteed.',
    accent: '✓',
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    description: 'Our dedicated team is always here — day or night, whenever you need us.',
    accent: '◎',
  },
]

const OurPolicy = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Floating decorative shapes */
      gsap.utils.toArray('.float-pol').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -16 : 16,
          x: i % 3 === 0 ? 8 : -8,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 5 + i * 0.7,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        })
      })

      /* Heading */
      gsap.fromTo('.policy-heading',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.policy-heading', start: 'top 82%' }
        }
      )

      /* Cards: alternate slide from left / right */
      gsap.utils.toArray('.policy-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#0d0d0d] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <svg className="float-pol absolute -top-6 right-10 w-56 h-56 opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="88" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeDasharray="5 4" />
        </svg>
        <svg className="float-pol absolute bottom-10 left-6 w-36 h-36 opacity-[0.04]" viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
        </svg>
        <svg className="float-pol absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.015]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Top edge */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Header ── */}
      <div className="policy-heading relative text-center mb-12 sm:mb-16">
        <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase
                         text-[#c9a96e] mb-4">
          Our Promise to You
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
          Shopping Made{' '}
          <span className="text-[#c9a96e] italic">Simple</span>
        </h2>
        <div className="mt-4 w-12 h-px bg-[#c9a96e]/60 mx-auto" />
      </div>

      {/* ── Cards ── */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {policies.map((policy, i) => (
          <div
            key={i}
            className="policy-card group relative flex flex-col items-center text-center
                        bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 sm:p-10
                        backdrop-blur-sm
                        hover:border-[#c9a96e]/45 hover:-translate-y-2
                        hover:bg-white/[0.07]
                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                        transition-all duration-400 ease-out overflow-hidden"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#c9a96e]/0 to-[#c9a96e]/[0.06]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />

            {/* Icon ring */}
            <div className="relative w-16 h-16 flex items-center justify-center
                            rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 mb-6
                            group-hover:bg-[#c9a96e]/20 group-hover:border-[#c9a96e]/40
                            transition-all duration-300">
              <img
                src={policy.icon}
                className="w-7 h-7 object-contain brightness-0 invert opacity-70
                           group-hover:opacity-100 transition-opacity duration-300"
                alt={policy.title}
              />
            </div>

            <p className="text-white font-serif font-medium text-lg mb-3">
              {policy.title}
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              {policy.description}
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#c9a96e]
                            group-hover:w-2/3 transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}

export default OurPolicy