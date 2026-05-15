import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
    <div className="text-2xl text-center pt-8 border-t">
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className="my-10 flex flex-col md:flex-row gap-16">
      <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]"/>
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
     <p>At KNOT, we believe that clothing is more than just fabric — it’s a reflection of personality, confidence, and comfort woven together. Founded with a passion for timeless design and everyday wearability, KNOT stands for the bond between style and simplicity. Every stitch, every thread, and every pattern tells a story of craftsmanship, precision, and care.</p>
      <p>Our vision is to create apparel that connects people through shared values — quality, authenticity, and effortless expression. Whether it’s the relaxed fit of our casuals or the refined touch of our formals, each KNOT piece is crafted to make you feel confident in your own skin. We blend minimalist aesthetics with modern trends, ensuring every outfit you wear carries a touch of individuality while staying true to comfort and sustainability.</p>
      <p>We take pride in working with skilled artisans and using high-grade, ethically sourced materials that stand the test of time. KNOT isn’t just about fashion — it’s about forming connections. It’s about tying together passion, people, and purpose into one seamless experience. From the first sketch to the final stitch, we ensure that what you wear not only looks good but also feels right.</p>
      <p>Welcome to <span className='text-gray-700 font-bold'>KNOT</span>  — where every thread ties you closer to who you are.</p>
    </div>
    </div>
    <div className="text-2xl py-4">
      <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-12 py-8 sm:py-20 flex flex-col gap-5">
        <b className='text-xl text-center'>Quality Assurance:</b>
        <p>At KNOT, quality isn’t a checkbox — it’s our foundation. Every garment goes through a meticulous process of selection, stitching, and inspection to ensure superior durability and finish. From premium fabrics to precision craftsmanship, we guarantee clothing that not only looks refined but lasts long, wear after wear.</p>
      </div>
      
      <div className="border px-10 md:px-12 py-8 sm:py-20 flex flex-col gap-5">
        <b className='text-xl text-center'>Convienence:</b>
        <p>Your comfort goes beyond what you wear — it’s in how you experience KNOT. From effortless browsing to smooth checkout and timely delivery, we’ve designed every step to be simple and seamless. Our goal is to make shopping as comfortable as slipping into your favorite outfit.</p>
      </div>

      <div className="border px-10 md:px-12 py-8 sm:py-20 flex flex-col gap-5">
        <b className='text-xl text-center'>Exceptional Customer Service:</b>
        <p>At KNOT, every customer is a part of our story. Our dedicated support team is always ready to help — whether it’s sizing guidance, styling suggestions, or quick order resolutions. We value your trust and strive to make every interaction warm, responsive, and memorable.</p>
      </div>
    </div>

    <NewsLetterBox/>

    </div>

  )
}

export default About