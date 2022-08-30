import { Router } from "express";
import {
  getRows,
  markRow,
  getMarkTimes,
  getViews,
  updateView,
  removeView,
  addView,
} from "../controllers/marker.controller";
const router = Router();

router.get("/:viewName/rows", getRows);
router.put("/:viewName/row", markRow);
router.get("/:viewName/time", getMarkTimes);
router.get("/view", getViews);
router.put("/view", updateView);
router.delete("/view", removeView);
router.post("/view", addView);

export default router;
