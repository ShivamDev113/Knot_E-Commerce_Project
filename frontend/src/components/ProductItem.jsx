import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="group block rounded-xl overflow-hidden bg-[#161616] border border-white/8 hover:border-[#c9a96e]/30 transition-all duration-300 ease-out"
    >
      {/* Image wrapper */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#111]">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          style={{ '--tw-scale-x': 'var(--scale)', '--tw-scale-y': 'var(--scale)' }}
        />
        {/* Overlay shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick view hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <span className="text-[10px] tracking-widest uppercase text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
            View Product
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-white/80 text-xs sm:text-sm font-light leading-snug line-clamp-2 group-hover:text-white transition-colors duration-200">
          {name}
        </p>
        <p className="mt-1.5 text-[#c9a96e] text-sm font-medium">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem