import { Link } from 'react-router-dom'

const Card = () => {
  
  return (
    <Link to="/product" className='border py-2 lg:p-4 grid gap-1 lg:gap-3 max-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src="product.jpg"
                className='w-full h-full object-scale-down lg:scale-125'
            />
      </div>
      <div className='flex items-center gap-1'>
        <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
              10 min 
        </div>
        <div>
            <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>10% discount</p>
        </div>
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        name
      </div>
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        unit
        
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold'>
              price
          </div>
          
          
        </div>
        <div className=''>
            Add
            
        </div>
      </div>

    </Link>
  )
}

export default Card