import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import grid_1 from '../assets/grid_1.jpeg'

gsap.registerPlugin(ScrollTrigger)

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="float-grid absolute -top-8 -right-8 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="64" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeDasharray="5 4"/>
    </svg>
    <svg className="float-grid absolute bottom-16 left-8 w-40 h-40 opacity-[0.04]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
      <polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="#c9a96e" strokeWidth="0.8"/>
    </svg>
    <svg className="float-grid absolute top-1/3 left-1/3 w-24 h-24 opacity-[0.03]" viewBox="0 0 100 100">
      {Array.from({length:3}).map((_,r) =>
        Array.from({length:3}).map((_,c) => (
          <circle key={`${r}-${c}`} cx={16+c*34} cy={16+r*34} r="2.5" fill="#c9a96e"/>
        ))
      )}
    </svg>
  </div>
)

const Grid_temp = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Floating shapes drift */
      gsap.utils.toArray('.float-grid').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -18 : 18,
          x: i % 3 === 0 ? 10 : -10,
          duration: 5 + i * 0.9,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut', delay: i * 0.4,
        })
      })

      /* Heading */
      gsap.fromTo('.grid-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.grid-heading', start: 'top 82%' }
        }
      )

      /* Grid items stagger */
      gsap.fromTo('.grid-item',
        { opacity: 0, y: 55, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: { each: 0.11, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#0d0d0d] overflow-hidden"
    >
      <FloatingShapes />

      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      {/* ── Header ── */}
      <div className="grid-heading relative text-center mb-12 sm:mb-16">
        <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase
                         text-[#c9a96e] mb-4">
          Curated for You
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
          Shop by <span className="text-[#c9a96e] italic">Category</span>
        </h2>
        <div className="mt-4 w-12 h-px bg-[#c9a96e]/60 mx-auto" />
      </div>

      {/* ── Grid ── */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[260px] sm:auto-rows-[300px]">

          {/* ─── BIG CARD left — spans 2 cols × 2 rows ─── */}
          <div className="grid-item relative rounded-2xl overflow-hidden
                          lg:col-span-2 lg:row-span-2 group cursor-pointer
                          border border-white/[0.07] hover:border-[#c9a96e]/30
                          transition-colors duration-300">
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
              className="w-full h-full object-cover object-center
                         group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Ethereal Elegance"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"/>
            {/* Gold edge shimmer on hover */}
            <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-1 ring-[#c9a96e]/25
                            transition-all duration-400 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-2">
                Ethereal Elegance
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white leading-tight mb-5">
                Where Dreams<br />Meet Couture
              </h2>
              <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden
                                 bg-[#c9a96e] text-black font-semibold
                                 text-xs px-6 py-2.5 rounded-full
                                 hover:shadow-[0_0_24px_rgba(201,169,110,0.45)]
                                 transition-all duration-300">
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0
                                 transition-transform duration-300 ease-out" />
                <span className="relative">Shop Now</span>
                <svg className="relative w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                     fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ─── TOP RIGHT — wide card ─── */}
          <div className="grid-item relative rounded-2xl overflow-hidden
                          col-span-1 sm:col-span-2 group cursor-pointer
                          border border-white/[0.07] hover:border-[#c9a96e]/30 transition-colors duration-300">
            <img
              src={grid_1}
              className="w-full h-full object-cover object-center
                         group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Radiant Reverie"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/>
            <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-1 ring-[#c9a96e]/25
                            transition-all duration-400 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-1">
                Radiant Reverie
              </p>
              <h3 className="text-lg font-serif font-light text-white mb-3">
                Enchanting Styles for Every Woman
              </h3>
              <button className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden
                                 border border-white/30 text-white
                                 text-[10px] font-medium px-4 py-1.5 rounded-full
                                 hover:border-[#c9a96e]/60 hover:text-[#c9a96e]
                                 transition-all duration-250">
                Shop Now
              </button>
            </div>
          </div>

          {/* ─── BOTTOM LEFT ─── */}
          <div className="grid-item relative rounded-2xl overflow-hidden group cursor-pointer
                          border border-white/[0.07] hover:border-[#c9a96e]/30 transition-colors duration-300">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              className="w-full h-full object-cover
                         group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Urban Strides"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/>
            <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-1 ring-[#c9a96e]/25
                            transition-all duration-400 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-1">
                Urban Strides
              </p>
              <h3 className="text-base sm:text-lg font-serif font-light text-white mb-3">
                Chic Footwear for City Living
              </h3>
              <button className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden
                                 border border-white/30 text-white
                                 text-[10px] font-medium px-4 py-1.5 rounded-full
                                 hover:border-[#c9a96e]/60 hover:text-[#c9a96e]
                                 transition-all duration-250">
                Shop Now
              </button>
            </div>
          </div>

          {/* ─── BOTTOM RIGHT — Gold offer card ─── */}
          <div className="grid-item relative rounded-2xl overflow-hidden
                          bg-gradient-to-br from-[#1a1506] to-[#0d0d0d]
                          border border-[#c9a96e]/20
                          flex flex-col items-center justify-center text-center p-8
                          group cursor-pointer hover:border-[#c9a96e]/50
                          hover:shadow-[0_0_50px_rgba(201,169,110,0.12)]
                          transition-all duration-400">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-52 h-52 rounded-full border border-[#c9a96e]/10 absolute
                              group-hover:border-[#c9a96e]/20 transition-colors duration-400"/>
              <div className="w-32 h-32 rounded-full border border-[#c9a96e]/15 absolute
                              group-hover:border-[#c9a96e]/30 transition-colors duration-400"/>
              <div className="w-16 h-16 rounded-full bg-[#c9a96e]/5 absolute
                              group-hover:bg-[#c9a96e]/10 transition-colors duration-400"/>
            </div>

            <div className="relative">
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#c9a96e]/70 mb-3">
                Trendsetting Bags for Her
              </p>
              <div className="text-7xl sm:text-8xl font-black text-[#c9a96e] leading-none mb-1
                              group-hover:scale-105 transition-transform duration-300">
                50%
              </div>
              <p className="text-white/40 text-xs mb-6 tracking-wide">Limited time offer</p>
              <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden
                                 bg-[#c9a96e] text-black font-semibold
                                 text-xs px-6 py-2.5 rounded-full
                                 hover:shadow-[0_0_24px_rgba(201,169,110,0.5)]
                                 transition-all duration-300">
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0
                                 transition-transform duration-300 ease-out" />
                <span className="relative">Shop Now</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
    </section>
  )
}

export default Grid_temp