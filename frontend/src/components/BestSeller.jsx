import React, { useContext, useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setbestSeller] = useState([])
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setbestSeller(bestProduct.slice(0, 5))
  }, [products])

  // ── GSAP: ScrollTrigger — scale + fade from below ───────────────
  useEffect(() => {
    if (!bestSeller.length) return

    const ctx = gsap.context(() => {
      // Badge + heading animate in
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          }
        }
      )
      // Cards scale up + fade in with stagger
      gsap.fromTo(
        '.bestseller-card',
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [bestSeller])

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 bg-stone-50"
    >
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-10 sm:mb-14">
        {/* "Best Sellers" badge */}
        <span className="inline-block mb-3 text-xs font-semibold tracking-widest
                        uppercase text-amber-700 bg-amber-50
                        border border-amber-200 rounded-full px-4 py-1">
          Community Favourites
        </span>
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
          Our Best Sellers are the styles loved most by the Knot community —
          timeless, versatile, and always in demand.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="bestseller-card group relative rounded-xl overflow-hidden
                         bg-white border border-gray-100
                         hover:shadow-lg hover:-translate-y-1
                         transition-all duration-300 ease-out"
          >
            {/* Bestseller ribbon */}
            <div className="absolute top-3 left-3 z-10 text-[10px] font-bold
                            tracking-wider uppercase bg-black text-white
                            px-2 py-0.5 rounded-full">
              Hot
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
    </section>
  )
}

export default BestSeller