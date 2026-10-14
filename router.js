import { Router } from "express";
import ProductController from "./ProductController.js";
const router = new Router()

router.get("/products" , ProductController.getProducts)
router.post("/addproducts", ProductController.addProduct)
router.put("/products/:id" , ProductController.updateProduct)
router.patch("/product/:id" , ProductController.editProduct)
router.delete('/products/:id' , ProductController.deletProduct)

export default router