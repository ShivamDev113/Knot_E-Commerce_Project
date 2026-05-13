import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange',
    description: 'Hassle-free exchanges with no questions asked',
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Returns',
    description: 'Full refund within 7 days, no strings attached',
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    description: 'Our team is always here whenever you need us',
  },
]

const OurPolicy = () => {
  const sectionRef = useRef(null)

  // ── GSAP: ScrollTrigger — alternate left/right slide ────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.policy-card')

      cards.forEach((card, i) => {
        // Alternate: even → from left, odd → from right
        const xFrom = i % 2 === 0 ? -40 : 40

        gsap.fromTo(
          card,
          { opacity: 0, x: xFrom },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {policies.map((policy, i) => (
          <div
            key={i}
            className="policy-card flex flex-col items-center text-center
                         bg-white border border-gray-100 rounded-2xl p-8
                         hover:shadow-md hover:-translate-y-1
                         transition-all duration-300 ease-out"
          >
            <div className="w-14 h-14 flex items-center justify-center
                            rounded-full bg-stone-100 mb-5">
              <img
                src={policy.icon}
                className="w-7 h-7 object-contain"
                alt={policy.title}
              />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1.5">
              {policy.title}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy