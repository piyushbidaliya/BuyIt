import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"
import Dashboard from "../pages/Dashboard"
import Profile from "../components/Profile"
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import CategoryPage from "../pages/CategoryPage"
import SubCategory from "../pages/SubCategory"
import UploadProduct from "../pages/UploadProduct"
import ProductAdmin from "../pages/ProductAdmin"
import AdminPermission from "../components/AdminPermission"
import ProductListPage from "../pages/ProductListPage"
import ProductDisplayPage from "../pages/ProductDisplayPage"
import CheckoutPage from "../pages/CheckoutPage"
import Success from "../pages/Success"
import Cancel from "../pages/Cancel"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "otp-verification",
                element: <OtpVerification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "profile",
                        element: <Profile/>
                    },
                    {
                        path: "myorders",
                        element: <MyOrders/>
                    },
                    {
                        path: "address",
                        element: <Address/>
                    },
                    {
                        path: "category",
                        element: <AdminPermission>
                            <CategoryPage/>
                        </AdminPermission>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermission>
                                <SubCategory/>
                            </AdminPermission>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermission>
                                <UploadProduct/>
                            </AdminPermission>
                    },
                    {
                        path: "product",
                        element: <AdminPermission>
                                <ProductAdmin/>
                            </AdminPermission>
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage/>
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage/>
            },
            {
                path: "checkout",
                element: <CheckoutPage/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            }
        ]
    }
])
export default routes