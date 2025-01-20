import { Router } from "express";
import { getAllSongs, getSongById, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs} from "../controllers/song.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.get('/',protectedRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);

router.get("/songId", getSongById);

export default router