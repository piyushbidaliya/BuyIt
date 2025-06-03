import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../connection/SummaryApi'
import { logout } from '../store/UserSlice'
import AxiosToastError from '../utils/AxiosToastError.jsx'
import { toast } from 'react-toastify'
import isAdmin from "../utils/isAdmin.jsx";

function UserMenu({close}) {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async()=>{
      try {
        const response = await Axios({
            ...SummaryApi.logout
          })
        if(response.data.success){
          close()
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate("/")
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }

    const handleClose = ()=>{
      if(close){
        close()
      }
    }
  return (
    <div>
      <div className="">My Account</div>
      <div className='flex items-center gap-2'>
          {user.name || user.mobile} <span className="text-[12px] text-red-600">{user.role === "ADMIN" ? "(ADMIN)" : ""}</span>
          <Link onClick={handleClose} to="/dashboard/profile"> <FiExternalLink /></Link>
      </div>
      <div className='p-[0.5px] bg-slate-100'></div>
      <div className='text-sm grid gap-2'>
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/category">Category</Link>
          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/subcategory">Sub Category</Link>
          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/upload-product">Upload Product</Link>
          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/product">Product</Link>
          )
        }
        <Link onClick={handleClose} to="/dashboard/myorders">My Orders</Link>
        <Link onClick={handleClose} to="/dashboard/address">Save Address</Link>
        <button onClick={handleLogout} className='text-left cursor-pointer'>Log Out</button>
      </div>
    </div>
  )
}

export default UserMenu
