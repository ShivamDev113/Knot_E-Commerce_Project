import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'   
import { toast } from 'react-toastify'

const Verify = () => {

    const {token ,navigate , setcart, backendURL}=useContext(ShopContext)
    const [searchParams , setsearchParams]=useSearchParams()

    const success= searchParams.get('success')
    const orderId= searchParams.get('orderId')

    const verifyPayment=async()=>{

        try {
            if(!token){
                return null
            }
            const response=await axios.post(backendURL + '/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if(response.data.success){
                setcart({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }

    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>Verify</div>
  )
}

export default Verify