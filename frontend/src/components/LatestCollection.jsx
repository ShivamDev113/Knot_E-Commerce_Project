import React, { useContext, useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const [latestProducts, setlatestProducts] = useState([])
  const { products } = useContext(ShopContext)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    setlatestProducts(products.slice(0, 10))
  }, [products])

  // ── GSAP: ScrollTrigger — fade up + stagger cards ───────────────
  useEffect(() => {
    if (!latestProducts.length) return

    const ctx = gsap.context(() => {
      // Heading animates in first
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
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
      // Product cards stagger up on scroll
      gsap.fromTo(
        '.latest-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [latestProducts])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-10 sm:mb-14">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
          Discover fresh designs crafted with passion — our newest collection
          brings timeless fashion and contemporary vibes together.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="latest-card group rounded-xl overflow-hidden
                         bg-white border border-gray-100
                         hover:shadow-lg hover:-translate-y-1
                         transition-all duration-300 ease-out"
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
    </section>
  )
}

export default LatestCollection