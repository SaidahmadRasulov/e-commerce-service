import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";
import { validate_form } from "../middlewares/validate_form.js";
import { upload } from "../middlewares/upload.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const product_router = Router();

product_router.post(
  "/",
  authCheck,
  checkPermission("create_product"),
  upload.single("image"),
  createProductValidator,
  validate_form,
  createProduct,
);
product_router.get("/", getProducts);
product_router.get("/:id", getProductById);
product_router.put(
  "/:id",
  authCheck,
  checkPermission("update_product"),
  upload.single("image"),
  updateProduct,
);
product_router.delete("/:id", authCheck, checkPermission("delete_product"), deleteProduct);

export default product_router;
