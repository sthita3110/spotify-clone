import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get('/', protectedRoute, getAllUsers)
//to-do: getMessages
export default router