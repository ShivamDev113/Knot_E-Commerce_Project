import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { corousel_img } from '../assets/C_img'

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = corousel_img.length
  const containerRef = useRef(null)
  const dotsRef = useRef(null)

  // ── GSAP: Page-load hero animation ──────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Carousel container fades + slides from top
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
      )
      // Dots stagger in after carousel
      gsap.fromTo(
        '.carousel-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          delay: 0.6
        }
      )
      // Nav buttons slide in from sides
      gsap.fromTo('.carousel-prev',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo('.carousel-next',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ── Auto-play ────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const gotoSlide = (index) => setCurrentIndex(index)
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % totalSlides)

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-6" ref={containerRef}>
      <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[21/9]
                   rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">

        {/* Slides */}
        {corousel_img.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700
                        ${index === currentIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'}`}
          >
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        ))}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="carousel-prev absolute top-1/2 -translate-y-1/2 left-3 sm:left-5
                     w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                     bg-white/80 backdrop-blur-sm text-gray-800
                     rounded-full shadow-md cursor-pointer z-20
                     hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="carousel-next absolute top-1/2 -translate-y-1/2 right-3 sm:right-5
                     w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                     bg-white/80 backdrop-blur-sm text-gray-800
                     rounded-full shadow-md cursor-pointer z-20
                     hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {/* Pill dots */}
        <div ref={dotsRef} className="absolute bottom-4 sm:bottom-5 w-full flex justify-center gap-1.5 z-20">
          {corousel_img.map((_, idx) => (
            <button
              key={idx}
              onClick={() => gotoSlide(idx)}
              className="carousel-dot cursor-pointer transition-all duration-300
                         h-1.5 rounded-full
                         ${idx === currentIndex
                           ? 'w-6 bg-white'
                           : 'w-1.5 bg-white/50 hover:bg-white/75'}"
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-4 right-5 z-20 bg-black/30 backdrop-blur-sm
                       text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {currentIndex + 1} / {totalSlides}
        </div>
      </div>
    </div>
  )
}

export default Header