import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/UserSlice";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./connection/SummaryApi";

function App() {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
  try {
    const response = await Axios({
      ...SummaryApi.getCategory
    })

      const {data: responseData} = response
      if(responseData.success){
        dispatch(setAllCategory(responseData.data))
        // setCategoryData(responseData.data)
      }

    } catch (error) {
      
    }finally{
    }
  }

  const fetchSubCategory = async()=>{
  try {
    const response = await Axios({
      ...SummaryApi.getSubCategory
    })

      const {data: responseData} = response
      if(responseData.success){
        dispatch(setAllSubCategory(responseData.data))
        // setCategoryData(responseData.data)
      }

    } catch (error) {
      
    }finally{
    }
  }


  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])
  return (
    <>
      <Header/>
      <main className="min-h-[78vh]">
        <Outlet/>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
