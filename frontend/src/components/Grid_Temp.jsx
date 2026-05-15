import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import grid_1 from '../assets/grid_1.jpeg'

const Grid_temp = () => {
  const sectionRef = useRef(null)

  // ── GSAP: ScrollTrigger — stagger grid items ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.grid-item',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75,
          stagger: {
            each: 0.12,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                       gap-4 auto-rows-[280px]"
        >
          {/* ─── LEFT BIG CARD (spans 2 cols + 2 rows) ─── */}
          <div
            className="grid-item relative rounded-2xl overflow-hidden
                         lg:col-span-2 lg:row-span-2 group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
              className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Ethereal Elegance"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="text-xs font-medium tracking-widest uppercase text-white/70 mb-2">
                Ethereal Elegance
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight mb-4">
                Where Dreams
Meet Couture
              </h2>
              <button
                className="inline-flex items-center gap-2 bg-white text-black
                             text-sm font-medium px-5 py-2.5 rounded-full
                             hover:bg-stone-100 transition-colors duration-200"
              >
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ─── TOP RIGHT ─── */}
          <div
            className="grid-item relative rounded-2xl overflow-hidden
                         col-span-1 sm:col-span-2 group cursor-pointer"
          >
            <img
              src={grid_1}
              className="w-full h-full object-cover object-center
                           group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Radiant Reverie"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-white/70 mb-1">
                Radiant Reverie
              </p>
              <h3 className="text-lg font-semibold text-white mb-3">
                Enchanting Styles for Every Woman
              </h3>
              <button
                className="inline-flex items-center gap-2 bg-white text-black
                             text-xs font-medium px-4 py-2 rounded-full
                             hover:bg-stone-100 transition-colors duration-200"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* ─── BOTTOM LEFT ─── */}
          <div
            className="grid-item relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Urban Strides"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-white/70 mb-1">
                Urban Strides
              </p>
              <h3 className="text-lg font-semibold text-white mb-3">
                Chic Footwear for City Living
              </h3>
              <button
                className="inline-flex items-center gap-2 bg-white text-black
                             text-xs font-medium px-4 py-2 rounded-full
                             hover:bg-stone-100 transition-colors duration-200"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* ─── BOTTOM RIGHT — Discount card ─── */}
          <div
            className="grid-item relative rounded-2xl overflow-hidden
                         bg-blue-900 flex flex-col items-center
                         justify-center text-center p-8 group cursor-pointer"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-52 h-52 rounded-full border border-white/10 absolute"/>
              <div className="w-36 h-36 rounded-full border border-white/10 absolute"/>
            </div>
            <p className="text-xs font-medium tracking-widest uppercase text-blue-300 mb-3">
              Trendsetting Bags for Her
            </p>
            <h2 className="text-6xl font-bold text-white mb-1">50%</h2>
            <p className="text-blue-200 text-sm mb-6">Limited time offer</p>
            <button
              className="inline-flex items-center gap-2 bg-white text-blue-900
                           text-sm font-semibold px-6 py-2.5 rounded-full
                           hover:bg-blue-50 transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Grid_temp