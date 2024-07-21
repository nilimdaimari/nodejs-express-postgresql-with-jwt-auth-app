import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.registerUser);
router.post("/signin", authController.loginUser);

export default router;
