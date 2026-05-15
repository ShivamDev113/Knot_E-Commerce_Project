import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Add from '../pages/Add'
import List from '../pages/List'
import Orders from '../pages/Orders'
import App from '../App'
const MainRoutes = ({token}) => {
  return (

    <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Routes>
            <Route path='/add' element={<Add token={token}/>}/>
            <Route path='/list' element={<List token={token}/>}/>
            <Route path='/orders' element={<Orders token={token}    />}/>
        </Routes>
    </div>

)
}

export default MainRoutes