import { Router } from "express";
import product_router from './product.route.js';
import authRouter from "./auth.route.js";
import group_router from "./group.route.js";

const router = Router();

router.use('/product', product_router)
router.use('/auth', authRouter)
router.use('/group', group_router)

export default router