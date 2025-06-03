import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';


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

const EditProductAdmin = ({ close ,data : propsData,fetchProductData}) => {
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageURL, setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")


  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("data", data)

//     try {
//       const response = await Axios({
//         ...SummaryApi.updateProductDetails,
//         data: data
//       })
//       const { data: responseData } = response

//       if (responseData.success) {
//         successAlert(responseData.message)
//         if(close){
//           close()
//         }
//         fetchProductData()
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//         })

//       }
//     } catch (error) {
//       AxiosToastError(error)
//     }


//   }

  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
      <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>
        <section className=''>
          <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Upload Product</h2>
            <button onClick={close}>
              <IoClose size={20}/>
            </button>
          </div>
          <div className='grid p-3'>
            <form className='grid gap-4'>
              <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Name</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter product name'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor='description' className='font-medium'>Description</label>
                <textarea
                  id='description'
                  type='text'
                  placeholder='Enter product description'
                  name='description'
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                />
              </div>
              <div>
                <p className='font-medium'>Image</p>
                <div>
                  <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                    <div className='text-center flex justify-center items-center flex-col'>
                      {
                        imageLoading ? <Loading /> : (
                          <>
                            <FaCloudUploadAlt size={35} />
                            <p>Upload Image</p>
                          </>
                        )
                      }
                    </div>
                    <input
                      type='file'
                      id='productImage'
                      className='hidden'
                      accept='image/*'
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/**display uploded image*/}
                  <div className='flex flex-wrap gap-4'>
                    {
                      data.image.map((img, index) => {
                        return (
                          <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                            <img
                              src={img}
                              alt={img}
                              className='w-full h-full object-scale-down cursor-pointer'
                              onClick={() => setViewImageURL(img)}
                            />
                            <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                              <MdDelete />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

              </div>
              <div className='grid gap-1'>
                <label className='font-medium'>Category</label>
                <div>
                  <select
                    className='bg-blue-50 border w-full p-2 rounded'
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const category = allCategory.find(el => el._id === value)

                      setData((preve) => {
                        return {
                          ...preve,
                          category: [...preve.category, category],
                        }
                      })
                      setSelectCategory("")
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {
                      allCategory.map((c, index) => {
                        return (
                          <option value={c?._id}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                  <div className='flex flex-wrap gap-3'>
                    {
                      data.category.map((c, index) => {
                        return (
                          <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                            <p>{c.name}</p>
                            <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                              <IoClose size={20} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='grid gap-1'>
                <label className='font-medium'>Sub Category</label>
                <div>
                  <select
                    className='bg-blue-50 border w-full p-2 rounded'
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const subCategory = allSubCategory.find(el => el._id === value)

                      setData((preve) => {
                        return {
                          ...preve,
                          subCategory: [...preve.subCategory, subCategory]
                        }
                      })
                      setSelectSubCategory("")
                    }}
                  >
                    <option value={""} className='text-neutral-600'>Select Sub Category</option>
                    {
                      allSubCategory.map((c, index) => {
                        return (
                          <option value={c?._id}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                  <div className='flex flex-wrap gap-3'>
                    {
                      data.subCategory.map((c, index) => {
                        return (
                          <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                            <p>{c.name}</p>
                            <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                              <IoClose size={20} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              <div className='grid gap-1'>
                <label htmlFor='unit' className='font-medium'>Unit</label>
                <input
                  id='unit'
                  type='text'
                  placeholder='Enter product unit'
                  name='unit'
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='stock' className='font-medium'>Number of Stock</label>
                <input
                  id='stock'
                  type='number'
                  placeholder='Enter product stock'
                  name='stock'
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='price' className='font-medium'>Price</label>
                <input
                  id='price'
                  type='number'
                  placeholder='Enter product price'
                  name='price'
                  value={data.price}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='discount' className='font-medium'>Discount</label>
                <input
                  id='discount'
                  type='number'
                  placeholder='Enter product discount'
                  name='discount'
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>


              {/**add more field**/}
              {
                Object?.keys(data?.more_details)?.map((k, index) => {
                  return (
                    <div className='grid gap-1'>
                      <label htmlFor={k} className='font-medium'>{k}</label>
                      <input
                        id={k}
                        type='text'
                        value={data?.more_details[k]}
                        onChange={(e) => {
                          const value = e.target.value
                          setData((preve) => {
                            return {
                              ...preve,
                              more_details: {
                                ...preve.more_details,
                                [k]: value
                              }
                            }
                          })
                        }}
                        required
                        className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                      />
                    </div>
                  )
                })
              }

              <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
                Add Fields
              </div>

              <button
                className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
              >
                Update Product
              </button>
            </form>
          </div>

          {
            ViewImageURL && (
              <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
            )
          }

          {
            openAddField && (
              <AddFieldComponent
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                submit={handleAddField}
                close={() => setOpenAddField(false)}
              />
            )
          }
        </section>
      </div>
    </section>
  )
}

export default EditProductAdmin

