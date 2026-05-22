import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { corousel_img } from '../assets/C_img'

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = corousel_img.length
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Hero entrance */
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.1 }
      )

      /* Nav buttons */
      gsap.fromTo('.carousel-prev',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      )
      gsap.fromTo('.carousel-next',
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      )

      /* Dots */
      gsap.fromTo('.carousel-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1, duration: 0.4,
          stagger: 0.07, ease: 'back.out(1.7)', delay: 0.7
        }
      )

      /* Floating label */
      gsap.fromTo('.hero-badge',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* Auto-play */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4500)
    return () => clearInterval(interval)
  }, [totalSlides])

  const gotoSlide = (index) => setCurrentIndex(index)
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides)

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-6 pb-2" ref={containerRef}>
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[21/9]
                   rounded-2xl lg:rounded-3xl overflow-hidden
                   shadow-[0_24px_80px_rgba(0,0,0,0.7)]
                   border border-white/[0.06]"
      >
        {/* ── Slides ── */}
        {corousel_img.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
                        ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          >
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
        ))}

        {/* ── Gold corner accent ── */}
        <div className="absolute top-4 left-4 w-10 h-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-[#c9a96e]/60" />
          <div className="absolute top-0 left-0 h-full w-px bg-[#c9a96e]/60" />
        </div>
        <div className="absolute bottom-4 right-4 w-10 h-10 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-px bg-[#c9a96e]/60" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-[#c9a96e]/60" />
        </div>

        {/* ── Prev Button ── */}
        <button
          onClick={prevSlide}
          className="carousel-prev absolute top-1/2 -translate-y-1/2 left-3 sm:left-5 z-20
                     w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                     bg-black/40 backdrop-blur-md border border-white/20 rounded-full
                     text-white cursor-pointer
                     hover:bg-black/60 hover:border-[#c9a96e]/60 hover:scale-110
                     transition-all duration-250"
          aria-label="Previous slide"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ── Next Button ── */}
        <button
          onClick={nextSlide}
          className="carousel-next absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 z-20
                     w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                     bg-black/40 backdrop-blur-md border border-white/20 rounded-full
                     text-white cursor-pointer
                     hover:bg-black/60 hover:border-[#c9a96e]/60 hover:scale-110
                     transition-all duration-250"
          aria-label="Next slide"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* ── Pill dots ── */}
        <div className="absolute bottom-4 sm:bottom-5 w-full flex justify-center gap-2 z-20">
          {corousel_img.map((_, idx) => (
            <button
              key={idx}
              onClick={() => gotoSlide(idx)}
              className={`carousel-dot cursor-pointer transition-all duration-400 h-1.5 rounded-full
                          ${idx === currentIndex
                  ? 'w-7 bg-[#c9a96e]'
                  : 'w-1.5 bg-white/35 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* ── Slide counter ── */}
        <div className="absolute top-4 right-4 sm:right-5 z-20
                       bg-black/40 backdrop-blur-md border border-white/15
                       text-white/70 text-[10px] font-medium tracking-widest
                       px-3 py-1.5 rounded-full">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>

        {/* ── Hero badge bottom-left ── */}
        <div className="hero-badge absolute bottom-10 sm:bottom-12 left-4 sm:left-8 z-20">
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md
                          border border-[#c9a96e]/30 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c9a96e]">
              New Collection
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header