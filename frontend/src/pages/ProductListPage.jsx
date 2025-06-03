import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../connection/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const Loading = ()=>{
  return(
    <div className='flex justify-center items-center p-4 h-9'>
      <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  console.log(AllSubCategory)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className="min-h-screen pt-10 bg-gray-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">

        {/* Sidebar - Subcategories */}
        <aside className="bg-white shadow rounded p-2 h-[calc(100vh-100px)] overflow-y-auto">
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                key={s._id}
                to={link}
                className={`flex items-center gap-3 p-2 border-b hover:bg-green-100 
                  ${subCategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <img src={s.image} alt={s.name} className="w-10 h-10 object-contain" />
                <p className="text-sm">{s.name}</p>
              </Link>
            );
          })}
        </aside>

        {/* Main Content - Products */}
        <main className="bg-white shadow rounded p-4 overflow-y-auto h-[calc(100vh-100px)]">
          <h3 className="font-semibold text-xl mb-4 capitalize">{subCategoryName}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + index} />
            ))}
          </div>

          {loading && <Loading />}
        </main>
      </div>
    </section>

  )
}

export default ProductListPage