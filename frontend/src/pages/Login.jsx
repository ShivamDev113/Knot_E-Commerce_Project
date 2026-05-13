import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setcurrentState] = useState("Login")
  const { token, setToken, navigate, backendURL } = useContext(ShopContext)

  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [showPassword, setshowPassword] = useState(false)


  const onSubmitHandler = async (e) => {
    
    e.preventDefault()

    try {
      //if the state is sign-up we will call the registraion api---->
      if(currentState === 'Sign Up'){
        
        const response = await axios.post(backendURL + '/api/user/register' , {name,email,password})    
        
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
  
      }
  
      //if the state is Login we will call the login api----->
      else{
        
        const response= await axios.post(backendURL + '/api/user/login' , {email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success('Logged-In')
        }
        else{
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
  
    if(token){
      navigate('/')
    }
  }, [token])
  

  return (
    <>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-150 m-auto mt-16 mb-16 gap-5 text-gray-800 bg-[#fdfeff] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)]">

        {/* Heading */}
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <p className="prata-regular text-4xl font-semibold text-gray-800 tracking-wide">
            {currentState}
          </p>
          <hr className="border-none h-[1.5px] w-10 bg-gray-800" />
        </div>

        {/* Inputs */}
        {currentState === 'Login' ? '' : (
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
            placeholder="Name" onChange={(e) => { setname(e.target.value) }} value={name}
            required
          />
        )}

        <input
          type="email" 
          className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
          placeholder="Email" onChange={(e)=>setemail(e.target.value)} value={email}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
          placeholder="Password" onChange={(e)=> setpassword(e.target.value)} value={password}
          required
        />
        <i className={`${showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg relative bottom-13 left-25 sm:left-60`}
        onClick={()=>setshowPassword(!showPassword)}
          style={{}}
        />
        {currentState === "Login" && (
          <div className="w-full flex ml-4">
            <p className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200">
              Forgot Password?
            </p>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-gray-800 text-white py-3 rounded-lg font-medium tracking-wide hover:bg-gray-700 active:scale-[0.98] transition-all duration-200"
        >
          {currentState === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-gray-600 mt-3">
          {currentState === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={() => setcurrentState(currentState === "Login" ? "Sign Up" : "Login")}
            className="ml-1 text-gray-900 font-semibold cursor-pointer hover:underline"
          >
            {currentState === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </>
  )
}

export default Login
