import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NewsLetterBox = () => {
    const sectionRef = useRef(null)

    // ── GSAP: ScrollTrigger — fade + slight zoom in ──────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, scale: 0.97 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            )
            // Stagger inner elements
            gsap.fromTo(
                '.newsletter-content > *',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const onSubmitHandler = (e) => e.preventDefault()

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 bg-stone-50"
        >
            <div
                className="newsletter-content max-w-2xl mx-auto text-center"
            >
                {/* Label */}
                <span className="inline-block mb-4 text-xs font-semibold tracking-widest
                        uppercase text-rose-600 bg-rose-50
                        border border-rose-200 rounded-full px-4 py-1">
                    Exclusive Offer
                </span>

                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
                    Subscribe & Get{' '}
                    <span className="text-rose-600">20% Off</span>
                </h2>

                <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">
                    Join the Knot family today. Subscribe to our newsletter and enjoy
                    20% off your very first order.
                </p>

                <form
                    onSubmit={onSubmitHandler}
                    className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center"
                >
                    <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="w-full sm:w-80 px-5 py-3.5 text-sm border border-gray-200
                         rounded-xl outline-none bg-white text-gray-800
                         placeholder-gray-400 focus:border-gray-400
                         transition-colors duration-200"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 bg-black text-white
                         text-sm font-medium rounded-xl
                         hover:bg-gray-800 active:scale-95
                         transition-all duration-200 whitespace-nowrap"
                    >
                        Subscribe Now
                    </button>
                </form>

                <p className="mt-4 text-xs text-gray-400">
                    No spam, ever. Unsubscribe at any time.
                </p>
            </div>
        </section>
    )
}

export default NewsLetterBox