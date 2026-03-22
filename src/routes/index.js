import { Router } from "express";
import product_router from './product.route.js';
import authRouter from "./auth.route.js";

const router = Router();

router.use('/product', product_router)
router.use('/auth', authRouter)

export default router