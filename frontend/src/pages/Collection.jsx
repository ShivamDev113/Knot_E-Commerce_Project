import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products ,search , showSearch}=useContext(ShopContext)
  const [ShowFilter , setShowFilter]=useState(false) // show/hide filter panel on mobile.
  const [filterProducts, setfilterProducts] = useState([]) // list of products after filtering.
  const [category, setcategory] = useState([]) // which categories (MEN/WOMEN/KIDS) are selected.
  const [subCategory, setsubCategory] = useState([]) // which types (Topwear/Bottomwear/Winterwear) are selected.
  const [sortType, setsortType] = useState('relevant')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 16

  const toggleCategory=(e)=>{
    
    if(category.includes(e.target.value)){
        setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else {
      setcategory(prev=>[...prev,e.target.value])
    }
  }
  
  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubCategory(prev=>[...prev,e.target.value])
    }
  }

  //Applying Filters---->
  const applyFilter=()=>{

    let productsCopy=products.slice();

    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));
    }
    setfilterProducts(productsCopy)
    setCurrentPage(1)
  }

  const sortProduct=()=>{

    let fpCopy=filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setfilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  const totalPages = Math.max(1, Math.ceil(filterProducts.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filterProducts.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  // useEffect(() => {
  //   console.log(category);
  // }, [category])
  
  // useEffect(() => {
  //   console.log(subCategory );
  // }, [subCategory])
  


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t lg:px-5'>

      {/* Rendering a filter options---> */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!ShowFilter)} className='my-2 flex items-center font-bold text-xl cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${ShowFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

      {/* Category Filter */}
      
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter ? "" : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
          </p>
        </div>
      </div>

      {/* Sub Category */}
      <div className={`border border-gray-300 pl-5 py-3 my-6 ${ShowFilter ? "" : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Topwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
          </p>
        </div>
      </div>
      </div>

      {/* Filtered Items */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
            {/* Production Sort */}
            <select onChange={(e)=>setsortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2" >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

      {/* Mapping Products---> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 p-5">
        {
          currentProducts.map((item,index)=> (
            <ProductItem key={item._id || index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 items-center justify-center mt-8">
        <p className="text-sm text-gray-400">
          Showing {currentProducts.length} of {filterProducts.length} items
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium ${currentPage === index + 1 ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Collection