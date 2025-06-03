import { configureStore } from '@reduxjs/toolkit'
import  useReducer from './UserSlice.jsx'
import productReducer from './productSlice.jsx'
import cartReducer from './cartProduct.jsx'
import addressReducer from './addressSlice.jsx'
import orderReducer from './orderSlice.jsx'
export const store = configureStore({
  reducer: {
    user: useReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
    orders: orderReducer
  },
})