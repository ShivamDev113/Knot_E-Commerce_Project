import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/Home'
import Collection from '../pages/Collection'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Orders from '../pages/Orders'
import Login from '../pages/Login'
import PlaceOrder from '../pages/PlaceOrder'
import Verify from '../pages/Verify'
const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/collections' element={<Collection/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/product/:productId' element={<Product/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/place-order' element={<PlaceOrder/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
            <Route path='/verify' element={<Verify/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoutes