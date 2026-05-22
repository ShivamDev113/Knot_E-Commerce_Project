import React, { useContext, useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

gsap.registerPlugin(ScrollTrigger)

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    {/* Large concentric arcs — top right */}
    <svg className="float-bs absolute -top-8 -right-8 w-72 h-72 opacity-[0.045]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="5 4" />
      <circle cx="100" cy="100" r="44" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
    </svg>
    {/* Diamond — left center */}
    <svg className="float-bs absolute top-1/2 -left-6 w-44 h-44 opacity-[0.04]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="#c9a96e" strokeWidth="0.9" />
    </svg>
    {/* Dot grid — bottom left */}
    <svg className="float-bs absolute bottom-12 left-10 w-40 h-40 opacity-[0.04]" viewBox="0 0 100 100">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={12 + c * 25} cy={12 + r * 25} r="2.2" fill="#c9a96e" />
        ))
      )}
    </svg>
    {/* Triangle — bottom right */}
    <svg className="float-bs absolute bottom-10 right-8 w-24 h-24 opacity-[0.04]" viewBox="0 0 100 100">
      <polygon points="50,4 96,96 4,96" fill="none" stroke="#c9a96e" strokeWidth="2" />
    </svg>
  </div>
)

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setbestSeller] = useState([])
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setbestSeller(bestProduct.slice(0, 5))
  }, [products])

  useEffect(() => {
    if (!bestSeller.length) return
    const ctx = gsap.context(() => {

      /* Floating shapes drift */
      gsap.utils.toArray('.float-bs').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 3 === 0 ? 12 : -10,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 5.5 + i * 0.8,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        })
      })

      /* Badge + heading */
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      )

      /* Cards scale+fade stagger */
      gsap.fromTo('.bestseller-card',
        { opacity: 0, scale: 0.91, y: 32 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.7, stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [bestSeller])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#111111] overflow-hidden"
    >
      <FloatingShapes />

      {/* Top edge line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      {/* ── Section Header ── */}
      <div ref={headingRef} className="relative text-center mb-12 sm:mb-16">
        <span className="inline-block mb-4 text-[10px] font-bold tracking-[0.35em] uppercase
                         text-[#c9a96e] border border-[#c9a96e]/30 bg-[#c9a96e]/8
                         rounded-full px-5 py-1.5">
          Community Favourites
        </span>
        <div className="flex items-center justify-center gap-3">
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-white/40 leading-relaxed">
          The styles loved most by the Knot community —
          timeless, versatile, and always in demand.
        </p>
      </div>

      {/* ── Product Grid ── */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="bestseller-card group relative rounded-xl overflow-hidden
                        bg-[#0d0d0d] border border-white/[0.07]
                        hover:border-[#c9a96e]/40 hover:-translate-y-1.5
                        hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]
                        transition-all duration-350 ease-out"
          >
            {/* HOT badge */}
            <div className="absolute top-2.5 left-2.5 z-10 text-[9px] font-black
                            tracking-widest uppercase bg-[#c9a96e] text-black
                            px-2 py-0.5 rounded-full shadow-md">
              HOT
            </div>
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
    </section>
  )
}

export default BestSeller