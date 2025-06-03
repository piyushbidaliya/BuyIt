import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../connection/SummaryApi';
import { toast } from 'react-toastify';
import AxiosToastError from '../utils/AxiosToastError';
import { useEffect } from 'react';


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

const UploadSubCategoryModel = ({close, fetchData}) => {
    const [subCategoryData,setSubCategoryData] = useState({
        name : "",
        image : "",
        category : []
    })
    const [loading,setLoading] = useState(false)
    
    const allCategory = useSelector(state => state.product.allCategory)

    const handleChange = (e)=>{
        const { name, value} = e.target 

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        try {
            setLoading(true)
            const response = await uploadImage(file)
            const { data : ImageResponse } = response

            setSubCategoryData((preve)=>{
                return{
                    ...preve,
                    image : ImageResponse.data.url
                }
            })
        } catch (error) {
            
        } finally{
            setLoading(false)
        }

    }

    const handleRemoveCategorySelected = (categoryId)=>{
        const index = subCategoryData.category.findIndex(el => el._id === categoryId )
        subCategoryData.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data : subCategoryData
            })

            const { data : responseData } = response

            console.log("responseData",responseData)
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }

    }

  return (
    <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-5xl bg-white p-4 rounded'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Sub Category</h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border outline-none focus-within:border-[#ffbf00] rounded '
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    loading ? ( <Loading/>):(
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400'>No Image</p>
                                    ) : (
                                        <img
                                            alt='subCategory'
                                            src={subCategoryData.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    )
                                    )
                                }
                            </div>
                            <label htmlFor='uploadSubCategoryImage'>
                                    <div className='px-4 py-1 border border-[#ffbf00] text-[#ffbf00] rounded hover:bg-[#ffbf00] hover:text-neutral-900 cursor-pointer  '>
                                        Upload Image
                                    </div>

                                <input 
                                    type='file'
                                    id='uploadSubCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadSubCategoryImage}
                                />
                            </label>
                            
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-[#ffbf00] rounded'>
                            {/*display value**/}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategoryData.category.map((cat,index)=>{
                                        return(
                                            <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                                {cat.name}
                                                <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}>
                                                    <IoClose size={20}/>
                                                </div>
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            {/*select category**/}
                            <select
                                className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e)=>{
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    
                                    setSubCategoryData((preve)=>{
                                        return{
                                            ...preve,
                                            category : [...preve.category,categoryDetails]
                                        }
                                    })
                                }}
                            >
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button
                        className={`px-4 py-2 border border-[#ffbf00] text-[#ffbf00] hover:text-neutral-900
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? " hover:bg-[#ffbf00]" : "bg-gray-200"}    
                            font-semibold
                        `}
                    >
                        Submit
                    </button>
                    
            </form>
        </div>
    </section>
  )
}

export default UploadSubCategoryModel