import React, { useEffect, useState } from 'react'
import SummaryApi from '../connection/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";

const Loading = ()=>{
  return(
    <div className='flex justify-center items-center p-4 h-9'>
      <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span classNmae="sr-only">Loading...</span>
      </div>
    </div>
  )
}

const ProductAdmin = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
              limit : 12,
              search : search 
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setTotalPageCount(responseData.totalNoPage)
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[page])

  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(()=>{
    let flag = true 

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300);

    return ()=>{
      clearTimeout(interval)
    }
  },[search])
  
  return (
    <section className=''>
        <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
                <h2 className='font-semibold'>Product</h2>
                <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
                  <IoSearchOutline size={25}/>
                  <input
                    type='text'
                    placeholder='Search product here ...' 
                    className='h-full w-full  outline-none bg-transparent'
                    value={search}
                    onChange={handleOnChange}
                  />
                </div>
        </div>
        {
          loading && (
            <Loading/>
          )
        }


        <div className='p-4 bg-blue-50'>


            <div className='min-h-[55vh]'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {
                  productData.map((p,index)=>{
                    return(
                      <ProductCardAdmin data={p} fetchProductData={fetchProductData}  />
                    )
                  })
                }
              </div>
            </div>
            
            <div className='flex justify-between my-4'>
              <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
              <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
              <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
            </div>

        </div>
          

      
    </section>
  )
}

export default ProductAdmin


