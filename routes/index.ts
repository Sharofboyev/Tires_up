import {Router} from "express"
import { getRows, markRow } from "../controllers/marker.controller";
const router = Router();


router.get("/", getRows);
router.put("/", markRow);

export default router;