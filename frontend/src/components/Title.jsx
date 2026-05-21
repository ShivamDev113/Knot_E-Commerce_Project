import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-2">
      <span className="text-white/50 font-serif font-light tracking-wider text-inherit">
        {text1}
        <span className="text-[#c9a96e] font-medium ml-1">{text2}</span>
      </span>
      <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-[#c9a96e] to-transparent opacity-80" />
    </div>
  )
}

export default Title