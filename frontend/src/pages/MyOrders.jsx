import { useSelector } from 'react-redux'
import noDataImage from '../assets/nothing here yet.webp'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
          <div className='flex flex-col items-center justify-center p-4 gap-2'>
            <img
              src={noDataImage}
              alt='no data'
              className='w-36' 
            />
            <p className='text-neutral-500'>No Data</p>
          </div>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <p>Order No : {order?.orderId}</p>
                  <div className='flex gap-3'>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-14 h-14'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders