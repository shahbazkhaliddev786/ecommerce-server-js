import { Router } from "express";
import {Auth} from "../middleware/auth.js"
import uploadFiles from "../middleware/multer.js"
import { 
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct, 
    updateProductImage
} from "../controller/product.controller.js";

const productRouter = Router();

productRouter.post("/", Auth, uploadFiles, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.patch("/:id", updateProduct);
productRouter.patch("/:id", updateProductImage);
productRouter.delete("/:id", deleteProduct);

export default productRouter;