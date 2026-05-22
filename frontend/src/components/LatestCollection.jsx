import React, { useContext, useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

gsap.registerPlugin(ScrollTrigger)

/* ── Floating SVG background shapes ─────────────────────────────── */
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="float-lc absolute -top-10 -left-10 w-64 h-64 opacity-[0.045]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="65" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="6 4" />
      <circle cx="100" cy="100" r="38" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
    </svg>
    <svg className="float-lc absolute top-1/4 right-6 w-36 h-36 opacity-[0.04]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <polygon points="50,22 78,50 50,78 22,50" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </svg>
    <svg className="float-lc absolute bottom-16 left-1/4 w-28 h-28 opacity-[0.04]" viewBox="0 0 100 100">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={12 + c * 25} cy={12 + r * 25} r="2" fill="#c9a96e" />
        ))
      )}
    </svg>
    <svg className="float-lc absolute -bottom-6 right-12 w-48 h-48 opacity-[0.035]" viewBox="0 0 100 100">
      <line x1="50" y1="0" x2="50" y2="100" stroke="#c9a96e" strokeWidth="0.8" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#c9a96e" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#c9a96e" strokeWidth="1" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="#c9a96e" strokeWidth="0.6" strokeDasharray="3 3" />
    </svg>
  </div>
)

const LatestCollection = () => {
  const [latestProducts, setlatestProducts] = useState([])
  const { products } = useContext(ShopContext)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    setlatestProducts(products.slice(0, 10))
  }, [products])

  useEffect(() => {
    if (!latestProducts.length) return
    const ctx = gsap.context(() => {

      /* Floating shapes gentle drift */
      gsap.utils.toArray('.float-lc').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -18 : 18,
          x: i % 3 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 6 : -6,
          duration: 5 + i * 0.9,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.35,
        })
      })

      /* Heading reveal */
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      )

      /* Cards stagger */
      gsap.fromTo('.latest-card',
        { opacity: 0, y: 44, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [latestProducts])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#0d0d0d] overflow-hidden"
    >
      <FloatingShapes />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Section Header ── */}
      <div ref={headingRef} className="relative text-center mb-12 sm:mb-16">
        <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase
                         text-[#c9a96e] mb-4">
          Fresh Arrivals
        </span>
        <div className="flex items-center justify-center gap-3">
          <Title text1="LATEST" text2="COLLECTIONS" />
        </div>
        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-white/40 leading-relaxed">
          Discover fresh designs crafted with passion — our newest collection
          brings timeless fashion and contemporary vibes together.
        </p>
      </div>

      {/* ── Product Grid ── */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="latest-card group rounded-xl overflow-hidden
                        bg-[#161616] border border-white/[0.07]
                        hover:border-[#c9a96e]/35 hover:-translate-y-1.5
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)]
                        transition-all duration-350 ease-out"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="relative text-center mt-12 sm:mt-16">
        <a
          href="/collections"
          className="group inline-flex items-center gap-3 border border-white/20 text-white/60
                     hover:border-[#c9a96e]/60 hover:text-[#c9a96e]
                     px-8 py-3 rounded-full text-xs tracking-widest uppercase
                     transition-all duration-300 ease-out"
        >
          View All Collections
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}

export default LatestCollection