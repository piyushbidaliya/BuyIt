import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../connection/SummaryApi';
import { toast } from 'react-toastify'
import AxiosToastError from '../utils/AxiosToastError';

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

const UploadCategoryModel = ({close, fetchData}) => {
    const [data,setData] = useState({
        name : "",
        image : ""
    })
    const [loading,setLoading] = useState(false)

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        try {
            setLoading(true)
            const response = await uploadImage(file)
            const { data : ImageResponse } = response
            setData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
  return (
    <section className='fixed top-20 lg:top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Category</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label id='categoryName'>Name</label>
                    <input
                        type='text'
                        id='categoryName'
                        placeholder='Enter category name'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        className='bg-blue-50 p-2 border border-blue-100 focus-within:border-[#ffbf00] outline-none rounded'
                    />
                </div>
                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                            {
                            loading ? (
                                <Loading />
                            ) : data.image ? (
                                <img
                                alt='category'
                                src={data.image}
                                className='w-full h-full object-scale-down'
                                />
                            ) : (
                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                            }

                        </div>
                        <label htmlFor='uploadCategoryImage'>
     
                            <div  className={`
                            ${!data.name ? "bg-gray-300" : "border-[#ffbf00] hover:bg-[#ffbf00]" }  
                                px-4 py-2 rounded cursor-pointer border font-medium
                            `}>Upload Image</div>

                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                        
                    </div>
                </div>

                <button
                    className={`
                    ${data.name && data.image ? "bg-[#ffbf00] hover:bg-[ffbf00]" : "bg-gray-300 "}
                    py-2    
                    font-semibold 
                    `}
                >Add Category</button>
            </form>
        </div>
    </section>
  )
}

export default UploadCategoryModel