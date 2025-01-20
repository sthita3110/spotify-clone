import { Router } from "express";

import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getAllStats } from "../controllers/stat.controller.js";

const router = Router();

router.get('/',protectedRoute, requireAdmin, getAllStats);

export default router