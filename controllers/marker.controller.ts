import { NextFunction, Request, Response } from "express";
import {Marker} from "../services/marker"
import {validateMarkUpdate} from "../utils/validator"

const markerService = new Marker();

export async function getRows(req:Request, res: Response, next: NextFunction){
    let lastData = await markerService.getLast()
    res.send(lastData.recordset);
}

export async function markRow(req:Request, res: Response, next: NextFunction){
    let result = validateMarkUpdate(req.body)
    if (result.ok){
        await markerService.updateMarkValue(result.value.pvi, result.value.marked)
    }
    else return res.status(400).send(result.message);
}