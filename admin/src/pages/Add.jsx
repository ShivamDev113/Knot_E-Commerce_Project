// Importing required hooks and libraries
import React, { act, useState } from 'react'
import { assets } from '../assets/assets'           // Assets like upload image icon
import axios from "axios";                           // For API calls
import { backendUrl } from '../App';                 // Backend base URL
import { toast } from 'react-toastify';              // Toast notifications

// Add component receives token as prop
const Add = ({token}) => {

  // States for product images (initially false)
  const [image1, setImage1]=useState(false)
  const [image2, setImage2]=useState(false)
  const [image3, setImage3]=useState(false)
  const [image4, setImage4]=useState(false)

  // States for product details
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('Men')
  const [subCategory, setsubCategory] = useState('Topwear')
  const [bestseller, setbestseller] = useState(false)
  const [sizes, setsizes] = useState([])

  // Form submit handler
  const onSubmitHandler= async (e)=>{

    e.preventDefault(); // Prevent page reload on submit
    try {
      
      // Creating FormData object for sending data + files
      const formData=new FormData()

      // Appending text fields to FormData
      formData.append("name",name)
      formData.append("description" , description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestSeller",bestseller)
      formData.append("sizes",JSON.stringify(sizes)) // Sizes array converted to JSON string

      // Appending images only if they exist
      image1 && formData.append("image1" , image1)
      image2 && formData.append("image2" , image2)
      image3 && formData.append("image3" , image3)
      image4 && formData.append("image4" , image4)

      // API call to add product
      const response= await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {headers:{token}}
      )

      console.log(response.data);
      
      // If product added successfully
      if(response.data.success){
        
        toast.success(response.data.message)

        // Resetting form fields
        setname('')
        setdescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setprice('')
      }
      // If backend returns error
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  return (
    // Form wrapper
    <form onSubmit={onSubmitHandler}>
      <div className='flex flex-col w-full items-start gap-3'>
        <p className='mb-2'>Upload Image</p>
     
      {/* Image upload section */}
      <div className='flex gap-2'>
        <label htmlFor="image1">
          {/* Preview uploaded image or default upload icon */}
          <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
        </label>

        <label htmlFor="image2">
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
        </label>

        <label htmlFor="image3">
          <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
        </label>

        <label htmlFor="image4">
          <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
        </label>
      </div>
      </div>
 
      {/* Product name input */}
      <div className='w-full'>
        <p className='mt-2'>Product name</p>
        <input
          onChange={(e)=>setname(e.target.value)}
          value={name}
          className='w-full max-w-[400px] px-3 py-2 mt-2'
          type="text"
          placeholder='Enter Product Name'
          required
        />
      </div>

      {/* Product description */}
      <div className='w-full'>
        <p className='mt-2'>Produt description</p>
        <textarea
          onChange={(e)=>setdescription(e.target.value)}
          value={description}
          className='w-full max-w-[400px] px-3 py-2 mt-2'
          type="text"
          placeholder='Write description...'
        ></textarea>
      </div>

    {/* Category, subcategory and price */}
    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      
      <div>
        <p className='mb-2'>Product category</p>
        <select onChange={(e)=>setcategory(e.target.value)} className='w-auto px-3 py-2'>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      
      <div>
        <p className='mb-2'>Sub category</p>
        <select onChange={(e)=>setsubCategory(e.target.value)} className='w-auto px-3 py-2'>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className='mb-2'>Product Price</p>
        <input
          onChange={(e)=>setprice(e.target.value)}
          value={price}
          className='w-full px-3 py-2 sm:w-[120px]'
          type="Number"
          placeholder='250'
        />
      </div>
    </div>

    {/* Product sizes selection */}
    <div>
      <p className='mt-2'>Product Sizes</p>
      <div className='flex gap-3 mt-2'>

        {/* Each size toggles selection */}
        <div onClick={()=>setsizes(prev=> prev.includes("S") ? prev.filter(item=> item!=="S") : [...prev,"S"])}>
          <p className={`bg-slate-200 px-3 py-1 cursor-pointer rounded-md border ${sizes.includes("S") ? 'border-black' : 'border-transparent'}`}>S</p>
        </div>

        <div onClick={()=>setsizes(prev=> prev.includes("M") ? prev.filter(item=> item!=="M") : [...prev,"M"])}>
          <p className={`bg-slate-200 px-3 py-1 cursor-pointer rounded border ${sizes.includes("M") ? 'border-black' : 'border-transparent'}`}>M</p>
        </div>

        <div onClick={()=>setsizes(prev=> prev.includes("L") ? prev.filter(item=> item!=="L") : [...prev,"L"])}>
          <p className={`bg-slate-200 px-3 py-1 cursor-pointer rounded border ${sizes.includes("L") ? 'border-black' : 'border-transparent'}`}>L</p>
        </div>

        <div onClick={()=>setsizes(prev=> prev.includes("XL") ? prev.filter(item=> item!=="XL") : [...prev,"XL"])}>
          <p className={`bg-slate-200 px-3 py-1 cursor-pointer rounded border ${sizes.includes("XL") ? 'border-black' : 'border-transparent'}`}>XL</p>
        </div>

        <div onClick={()=>setsizes(prev=> prev.includes("XXL") ? prev.filter(item=> item!=="XXL") : [...prev,"XXL"])}>
          <p className={`bg-slate-200 px-3 py-1 cursor-pointer rounded border ${sizes.includes("XXL") ? 'border-black' : 'border-transparent'}`}>XXL</p>
        </div>
      </div>
    </div>

    {/* Bestseller checkbox */}
    <div className='flex gap-2 mt-2'>
      <input
        onChange={()=>setbestseller(prev=>!prev)}
        checked={bestseller}
        type="checkbox"
        id="bestseller"
      />
      <label className='cursor-pointer' htmlFor="bestseller">
        Add to bestseller
      </label>
    </div>

    {/* Submit button */}
    <button
      type='submit'
      className='w-28 py-3 mt-4 bg-black text-white hover:bg-gray-800 transition duration-200 cursor-pointer rounded-xl'
    >
      Add
    </button>

    </form>
  )
}

// Exporting component
export default Add
