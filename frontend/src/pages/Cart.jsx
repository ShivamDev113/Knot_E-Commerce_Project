import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="float-shape absolute top-10 right-10 w-48 h-48 opacity-[0.05]" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="6 4" />
    </svg>
    <svg className="float-shape absolute bottom-40 left-6 w-36 h-36 opacity-[0.05]" viewBox="0 0 100 100">
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
    </svg>
    <svg className="float-shape absolute top-1/3 left-1/4 w-24 h-24 opacity-[0.04]" viewBox="0 0 100 100">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={12.5 + c * 25} cy={12.5 + r * 25} r="2" fill="#c9a96e" />
        ))
      )}
    </svg>
  </div>
)

const Cart = () => {
  const { products, currency, cart, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setcartData] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const productID in cart) {
        for (const productSize in cart[productID]) {
          if (cart[productID][productSize] > 0) {
            tempData.push({
              _id: productID,
              size: productSize,
              quantity: cart[productID][productSize]
            })
          }
        }
      }
      setcartData(tempData)
    }
  }, [cart, products])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Floating shapes */
      gsap.utils.toArray('.float-shape').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -16 : 16, x: i % 3 === 0 ? 8 : -8,
          duration: 5 + i, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4,
        })
      })

      /* Heading */
      gsap.fromTo('.cart-heading',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      )

      /* Cart rows */
      gsap.fromTo('.cart-row',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      )

      /* Summary panel */
      gsap.fromTo('.cart-summary',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cart-summary', start: 'top 85%' }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [cartData])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0d0d0d] text-[#e8e0d0] overflow-hidden">
      <FloatingShapes />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-28">

        {/* Header */}
        <div className="cart-heading mb-10 border-b border-white/10 pb-6">
          <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
            Review Your Selection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white">
            Your <span className="text-[#c9a96e] italic">Cart</span>
          </h1>
        </div>

        {/* Empty state */}
        {cartData.length === 0 && (
          <div className="text-center py-24 text-white/30">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-lg font-serif font-light">Your cart is empty</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div
                key={index}
                className="cart-row group flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#c9a96e]/30 hover:bg-white/8 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm sm:text-base truncate">{productData.name}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[#c9a96e] font-medium text-sm">{currency}{productData.price}</span>
                    <span className="px-2 py-0.5 text-xs border border-white/20 rounded text-white/60 bg-white/5">
                      {item.size}
                    </span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                    className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#c9a96e]/60 hover:text-[#c9a96e] transition-all duration-200 text-sm"
                  >−</button>
                  <input
                    onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                    className="w-12 text-center bg-transparent border border-white/20 rounded-lg py-1 text-white text-sm focus:outline-none focus:border-[#c9a96e]/60"
                    type="number" min={1} value={item.quantity}
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#c9a96e]/60 hover:text-[#c9a96e] transition-all duration-200 text-sm"
                  >+</button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-red-500/50 hover:text-red-400 transition-all duration-200 ml-2"
                  aria-label="Remove item"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        {cartData.length > 0 && (
          <div className="cart-summary flex justify-end mt-16">
            <div className="w-full sm:w-[420px] bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className="group relative w-full overflow-hidden mt-6 bg-[#c9a96e] text-black font-semibold py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.35)]"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
                <span className="relative flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart