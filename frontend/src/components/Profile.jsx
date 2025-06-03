import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import UserProfileImgUpdate from './UserProfileImgUpdate'
import SummaryApi from '../connection/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { setUserDetails } from '../store/UserSlice'
import fetchUserDetails from '../utils/fetchUserDetails'
import Axios from '../utils/Axios'
import { toast } from 'react-toastify'

function Profile() {
    const user = useSelector(state => state.user)
    const [openProfileImgUpdate, setProfileImgUpdate] = useState(false)
    const [userData, setUserData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || ""
    });
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
    setUserData({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || ""
    });
    }, [user]);

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setUserData((prev)=>{
            return{
                ...prev,
                [name]: value

            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUser,
                data: userData
            })

            const {data: responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))

            }
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
                user.avatar ? (
                    <img src={user.avatar} alt={user.name} className='w-full h-full'/>
                ) : (
                    <FaRegUserCircle size={60}/>
                )
            }
        </div>
        <button onClick={()=>setProfileImgUpdate(true)} className='text-xs border px-3 py-1 rounded-full mt-3'>Change Profile</button>
        {
            openProfileImgUpdate && (
                <UserProfileImgUpdate close={()=>setProfileImgUpdate(false)}/>
            )
        }
        <form onSubmit={handleSubmit} className='my-4 grid gap-4'>
            <div className='grid'>
                <label>Name</label>
                <input type="text"
                    placeholder='Enter your name'
                    className='p-2 bg-blue-50 outline-none border focus-within:border-[#ffbf00] rounded'
                    value={userData.name}
                    name= "name"
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid'>
                <label>Email</label>
                <input type="email" 
                    id='email'
                    placeholder='Enter your email'
                    className='p-2 bg-blue-50 outline-none border focus-within:border-[#ffbf00] rounded'
                    value={userData.email}
                    name= "email"
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid'>
                <label>Mobile</label>
                <input type="text" 
                    id='mobile'
                    placeholder='Enter your mobile'
                    className='p-2 bg-blue-50 outline-none border focus-within:border-[#ffbf00] rounded'
                    value={userData.mobile}
                    name= "mobile"
                    onChange={handleOnChange}
                />
            </div>

            <button className='border px-4 py-2 font-semibold hover:bg-[#ffbf00] border-[#ffbf00] text-[#ffbf00] hover:text-neutral-800 rounded'>
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>
        </form>
    </div>
  )
}

export default Profile
