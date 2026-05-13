import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MainRoutes from './Routes/MainRoutes'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css' ;

export const backendUrl= import.meta.env.VITE_BACKEND_URL 
export const currency = '₹';
const App = () => {

  const [Token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")

  useEffect(() => {

    localStorage.setItem('token', Token)

  }, [Token])
  
  
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {Token===""
      ? <Login setToken={setToken} /> 
      :
    <>
    <Navbar setToken={setToken}/>
    <hr className='border-gray-400' />
    <div className='flex w-full'>
    <Sidebar/>
    <MainRoutes token={Token}/>
    </div>
    </>
    }
    </div>
  )
}

export default App