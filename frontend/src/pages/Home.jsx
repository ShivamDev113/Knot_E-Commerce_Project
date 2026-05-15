import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Grid_temp from '../components/Grid_Temp'

// Register ScrollTrigger globally once at the app root
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
      <Grid_temp />
    </div>
  )
}

export default Home