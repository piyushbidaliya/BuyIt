import Router from 'express'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import auth  from '../middlewares/auth.js'
import { admin } from '../middlewares/Admin.js'

const productRouter = Router()
productRouter.post("/create", auth, createProductController)
productRouter.post("/get", getProductController)
productRouter.post("/get-product-by-category", getProductByCategory)
productRouter.post("/get-pruduct-by-category-and-subcategory", getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', getProductDetails)
productRouter.put('/update-product-details',auth , admin, updateProductDetails)
productRouter.delete('/delete-product',auth , admin, deleteProductDetails)
productRouter.post('/search-product', searchProduct)

export default productRouter 