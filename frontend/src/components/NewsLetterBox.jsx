import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NewsLetterBox = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Floating ring decoration */
      gsap.to('.nl-ring', {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })

      /* Floating blobs */
      gsap.utils.toArray('.float-nl').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 2 === 0 ? 10 : -10,
          duration: 5 + i,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        })
      })

      /* Content entrance */
      gsap.fromTo(sectionRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo('.nl-item',
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.11,
          ease: 'power3.out', delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onSubmitHandler = (e) => e.preventDefault()

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[#111111] overflow-hidden"
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Rotating dashed ring */}
        <svg
          className="nl-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="4 5"/>
        </svg>

        <svg className="float-nl absolute -top-4 -left-4 w-52 h-52 opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#c9a96e" strokeWidth="1.2"/>
          <circle cx="100" cy="100" r="55" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeDasharray="5 4"/>
        </svg>
        <svg className="float-nl absolute -bottom-6 -right-6 w-60 h-60 opacity-[0.04]" viewBox="0 0 100 100">
          <polygon points="50,4 96,96 4,96" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
          <polygon points="50,22 78,78 22,78" fill="none" stroke="#c9a96e" strokeWidth="0.8"/>
        </svg>
        <svg className="float-nl absolute top-8 right-1/4 w-28 h-28 opacity-[0.04]" viewBox="0 0 100 100">
          {Array.from({length: 3}).map((_,r) =>
            Array.from({length: 3}).map((_,c) => (
              <circle key={`${r}-${c}`} cx={16+c*34} cy={16+r*34} r="2.5" fill="#c9a96e"/>
            ))
          )}
        </svg>
      </div>

      {/* Top gold rule */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      {/* ── Content ── */}
      <div className="relative max-w-2xl mx-auto text-center">

        {/* Badge */}
        <div className="nl-item inline-flex items-center gap-2 mb-6
                        border border-[#c9a96e]/30 bg-[#c9a96e]/8
                        rounded-full px-5 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#c9a96e]">
            Exclusive Offer
          </span>
        </div>

        {/* Headline */}
        <h2 className="nl-item font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
          Subscribe &{' '}
          <span className="text-[#c9a96e] italic">Save 20%</span>
        </h2>

        {/* Sub copy */}
        <p className="nl-item mt-4 text-white/40 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          Join the Knot family today. Be first to know about new arrivals, exclusive drops, and member-only discounts.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="nl-item mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <div className="relative w-full sm:w-80">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full px-5 py-4 text-sm bg-white/5 border border-white/15 rounded-xl
                         text-white placeholder-white/30
                         focus:outline-none focus:border-[#c9a96e]/50 focus:bg-white/8
                         transition-all duration-250"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full sm:w-auto overflow-hidden
                       bg-[#c9a96e] text-black font-semibold
                       px-8 py-4 rounded-xl text-sm tracking-wider
                       hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]
                       active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0
                             transition-transform duration-350 ease-out" />
            <span className="relative">Subscribe Now</span>
          </button>
        </form>

        {/* Fine print */}
        <p className="nl-item mt-5 text-xs text-white/25 tracking-wide">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
    </section>
  )
}

export default NewsLetterBox