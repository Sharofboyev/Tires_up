import { Router } from "express";
import {
  getRows,
  markRow,
  getMarkTimes,
  getViews,
} from "../controllers/marker.controller";
const router = Router();

router.get("/:viewName/rows", getRows);
router.put("/:viewName/row", markRow);
router.get("/:viewName/time", getMarkTimes);
router.get("/view", getViews);

export default router;
