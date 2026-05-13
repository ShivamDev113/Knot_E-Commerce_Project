import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId}=useParams();

  const {products,currency , addToCart}=useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [image,setimage]=useState('')
  const [active, setactive] = useState('')

  const fetchProductsData= async ()=>{

    products.map((item)=>{
      if(item._id===productId){
        setproductData(item)
        setimage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductsData()
  },[productId , products])
  

  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Products Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
            {
              productData.image.map((item,index)=>(
                <img src={item} key={index} onMouseEnter={()=>setimage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className="w-full sm:w-[80%]">
             <img src={image} className='w-full h-[95%]' alt="" />
          </div>
        </div>

        {/* Information of Products----> */}
        <div className="flex-1">
          <h1 className='font-medium text-3xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 text-xl md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setactive(item)} key={index} className={`border px-4 py-2 cursor-pointer bg-gray-100
                  ${item===active ? "" : "border-gray-300"}`}>{item}</button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer" onClick={()=>addToCart(productData._id,active)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original Product.</p>
          <p>Cash on delivery is availabe on this product.</p>
          <p>Wasy return and exchange policy within 7 days.</p>  
          </div>  
        </div>
      </div>

      {/* Description & Review Section */}
        <div className="mt-15">
          <div className="flex">
            <b className="border-gray-500 border px-5 py-3 text-sm">Description</b>
            <p className="border-gray-500 border px-5 py-3 text-sm">Reviews(122)</p>
          </div>
          <div className="border-gray-500 flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
        </div>
        {/* Displaying Related Products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) 
  :
   <div className="opacity:0"></div>
}

export default Product