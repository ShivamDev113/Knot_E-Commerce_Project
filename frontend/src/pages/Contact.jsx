import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

gsap.registerPlugin(ScrollTrigger)

/* ─── Floating SVG shapes ─────────────────────────────────────── */
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="float-shape absolute -top-16 -right-16 w-72 h-72 opacity-[0.06]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="2" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
    </svg>
    <svg className="float-shape absolute top-1/3 -left-8 w-40 h-40 opacity-[0.05]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </svg>
    <svg className="float-shape absolute bottom-24 left-8 w-48 h-48 opacity-[0.07]" viewBox="0 0 100 100">
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="1.5" fill="#c9a96e" />
        ))
      )}
    </svg>
    <svg className="float-shape absolute bottom-10 right-10 w-24 h-24 opacity-[0.06]" viewBox="0 0 100 100">
      <polygon points="50,5 95,95 5,95" fill="none" stroke="#c9a96e" strokeWidth="2" />
    </svg>
  </div>
)

const Contact = () => {
  const imgRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.float-shape').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -18 : 18,
          x: i % 3 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 5 + i * 0.8,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4,
        })
      })

      gsap.fromTo(imgRef.current,
        { opacity: 0, x: -60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 78%' }
        }
      )

      gsap.fromTo('.contact-info-item',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 78%' }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-[#e8e0d0] overflow-hidden">
      <FloatingShapes />

      {/* ── Header ── */}
      <div className="relative pt-16 sm:pt-20 pb-8 sm:pb-10 text-center border-b border-white/10">
        <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-[#c9a96e] mb-3 sm:mb-4">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
          Contact <span className="text-[#c9a96e] italic">Us</span>
        </h1>
        <div className="mt-4 w-16 h-px bg-[#c9a96e] mx-auto opacity-60" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Image */}
          <div ref={imgRef} className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c9a96e]/20 to-transparent translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={assets.contact_img}
                  alt="Contact KNOT"
                  className="w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover object-center block"
                />
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div ref={infoRef} className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8 mt-4 lg:mt-0">

            {/* Heading */}
            <div className="contact-info-item">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Our Store</p>
              <p className="text-2xl sm:text-3xl font-serif font-light text-white">Visit Us</p>
            </div>

            {/* Address */}
            <div className="contact-info-item bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6
              backdrop-blur-sm hover:border-[#c9a96e]/40 hover:bg-white/[0.08] transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#c9a96e]/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">54098 Hazratganj</p>
                  <p className="text-white/60 text-xs sm:text-sm mt-0.5">Naza Market, Lucknow, INDIA</p>
                </div>
              </div>
            </div>

            {/* Phone / Email */}
            <div className="contact-info-item bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6
              backdrop-blur-sm hover:border-[#c9a96e]/40 hover:bg-white/[0.08] transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#c9a96e]/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 text-sm sm:text-base">Tel: (522) 555-0321</p>
                  <p className="text-white/60 text-xs sm:text-sm mt-0.5">admin@knot.com</p>
                </div>
              </div>
            </div>

            {/* Careers */}
            <div className="contact-info-item">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-2 sm:mb-3">
                Careers at KNOT
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-4 sm:mb-5">
                Learn more about our teams and job openings. Join a community that values creativity and craft.
              </p>
              <button className="group relative overflow-hidden border border-[#c9a96e] text-[#c9a96e]
                px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-widest uppercase font-medium
                transition-all duration-300 hover:text-black w-full sm:w-auto">
                <span className="absolute inset-0 bg-[#c9a96e] -translate-x-full group-hover:translate-x-0
                  transition-transform duration-300 ease-out" />
                <span className="relative">Explore Jobs</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="relative border-t border-white/10">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact