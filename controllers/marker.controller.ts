import { NextFunction, Request, Response } from "express";
import { Marker } from "../services/marker";
import { View } from "../services/view";
import {
  validateRow,
  validateMarkedRow,
  validateFilter,
  validateView,
  validateRemovedView,
} from "../utils/validator";

const markerService = new Marker();
const viewService = new View();

export async function getRows(req: Request, res: Response, next: NextFunction) {
  let result = validateFilter(req.query);
  if (result.ok) {
    try {
      let lastData = await markerService.getLast(
        req.params.viewName,
        result.value.limit,
        result.value.pvi
      );
      res.send(lastData.recordset);
    } catch (err) {
      res.status(500).send("Internal server error occured");
    }
  } else {
    return res.status(400).send(result.message);
  }
}

export async function markRow(req: Request, res: Response, next: NextFunction) {
  let result = validateMarkedRow(req.body);
  if (result.ok) {
    try {
      let markedDate = await markerService.updateMarkValue(
        result.value.pvi,
        result.value.marked
      );
      res.send(markedDate);
    } catch (err) {
      return res.status(500).send("Internal server error occured");
    }
  } else return res.status(400).send(result.message);
}

export async function getMarkTimes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let result = validateRow(req.query);
  if (result.ok) {
    try {
      let data = await markerService.getMarkTimes(result.value.pvi);
      res.send(data);
    } catch (err) {
      return res.status(500).send("Internal server error occured");
    }
  } else return res.status(400).send(result.message);
}

export async function getViews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let data = await viewService.getViews();
    res.send(data);
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}

export async function updateView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result = validateView(req.body);
    if (!result.ok) return res.status(400).send(result.message);

    await viewService.updateView(result.value);
    res.send("Success");
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}

export async function removeView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result = validateRemovedView(req.query);
    if (!result.ok) return res.status(400).send(result.message);

    await viewService.removeView(result.value.name);
    return res.send("Successfully removed");
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}

export async function addView(req: Request, res: Response, next: NextFunction) {
  try {
    let data = await viewService.getViews();
    res.send(data);
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}
