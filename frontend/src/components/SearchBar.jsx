import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {search,setsearch, showSearch , setshowSearch} =useContext(ShopContext)
    const [visible, setvisible] = useState(false)
    const location=useLocation()

    useEffect(() => {
        
        if(location.pathname.includes('collections')){
            setvisible(true)
        }
        else{
            setvisible(false)
        }
    }, [location])
    

  return showSearch && visible ?(
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input value={search} className='flex-1 outline-none bg-inherit text-sm' onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' />
        <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img src={assets.cross_icon} className='w-3 inline cursor-pointer' onClick={()=>setshowSearch(false)} alt="" />
    </div>
  ) : null
}

export default SearchBar