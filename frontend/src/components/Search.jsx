
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { IoSearch } from 'react-icons/io5'
import { useState } from 'react';
import { useEffect } from 'react';


const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const params = useLocation()
    const searchText = params.search.slice(3)
    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 '>
        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                <div onClick={redirectToSearchPage} className='w-full h-full flex items-center gap-2'>
                    <IoSearch className='ml-2'/>
                    <TypeAnimation
                        sequence={[
                            'Search "milk"',
                            1000,
                            'Search "bread"',
                            1000,
                            'Search "sugar"',
                            1000,
                            'Search "panner"',
                            1000,
                            'Search "chocolate"',
                            1000,
                            'Search "curd"',
                            1000,
                            'Search "rice"',
                            1000,
                            'Search "egg"',
                            1000,
                            'Search "chips"',
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        />
                </div>

                ):(
                    <div className='w-full h-full'>
                        <input
                         type="text"
                         placeholder='Search products you want'
                         autoFocus
                         defaultValue={searchText}
                         className='bg-transparent w-full h-full outline-none px-2'
                         onChange={handleOnChange}
                         />
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Search