import {Router} from "express"
import { getRows, markRow, getMarkTimes } from "../controllers/marker.controller";
const router = Router();

router.get("/rows", getRows);
router.put("/row", markRow);
router.get("/time", getMarkTimes)

export default router;