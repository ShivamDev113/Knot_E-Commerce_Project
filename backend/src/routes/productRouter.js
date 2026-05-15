const express=require('express')

const {addProduct,listProduct,removeProduct,productDetails}=require('../controller/productController')
const upload = require('../middleware/multer')
const adminAuth = require('../middleware/adminAuth')

const productRouter=express.Router()

productRouter.post('/add', adminAuth ,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct ) //here we use our multer cause in our /add route we need pass different type of images..
productRouter.post('/remove', adminAuth ,removeProduct )
productRouter.post('/single',productDetails )
productRouter.get('/list',listProduct)

module.exports=productRouter