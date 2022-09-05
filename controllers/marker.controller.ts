import e, { NextFunction, Request, Response } from "express";
import { Marker } from "../services/marker";
import { View } from "../services/view";
import {
  validateRow,
  validateMarkedRow,
  validateFilter,
  validateView,
  validateRemovedView,
  validateViewQuery,
} from "../utils/validator";

const markerService = new Marker();
const viewService = new View();

export async function getRows(req: Request, res: Response, next: NextFunction) {
  let result = validateFilter(req.query);
  if (result.ok) {
    try {
      const view = await viewService.getViews(req.params.viewName);
      if (view === null)
        return res.status(404).send("View with given name not found");
      let lastData = await markerService.getLast(
        view.query,
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
    const result = validateViewQuery(req.query);
    if (!result.ok) return res.status(400).send(result.message);
    let data = await viewService.getViews(result.value.name);
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
    const result = validateRemovedView(req.query);
    if (!result.ok) return res.status(400).send(result.message);
    if (!(await viewService.hasView(result.value.name)))
      return res.status(404).send("View with this name not exists");
    await viewService.removeView(result.value.name);
    return res.send("Successfully removed");
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}

export async function addView(req: Request, res: Response, next: NextFunction) {
  try {
    const result = validateView(req.body);
    if (!result.ok) return res.status(400).send(result.message);
    if (await viewService.hasView(result.value.name))
      return res.status(400).send("View with this name already exists");
    await viewService.addView(result.value.name, result.value.query);
    return res.send("Successfully added");
  } catch (err) {
    return res.status(500).send("Internal server error occured");
  }
}
