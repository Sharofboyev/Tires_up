import {Router} from "express"
import { getRows, markRow } from "../controllers/marker.controller";
const router = Router();


router.get("/rows", getRows);
router.put("/row", markRow);

export default router;