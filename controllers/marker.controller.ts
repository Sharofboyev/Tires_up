import { NextFunction, Request, Response } from "express";
import {Marker} from "../services/marker"
import {validateGetMarkTimesQuery, validateMarkUpdate, validateRequestQuery} from "../utils/validator"

const markerService = new Marker();

export async function getRows(req:Request, res: Response, next: NextFunction){
    let result = validateRequestQuery(req.query);
    if (result.ok){
        try {
            let lastData = await markerService.getLast(result.value.limit, result.value.pvi)
            res.send(lastData.recordset);
        } catch (err){
            res.status(500).send("Internal server error occured")
        }
    }
    else {
        return res.status(400).send(result.message);
    }
}

export async function markRow(req:Request, res: Response, next: NextFunction){
    let result = validateMarkUpdate(req.body)
    if (result.ok){
        try {
            let markedDate = await markerService.updateMarkValue(result.value.pvi, result.value.marked)
            res.send(markedDate)
        }catch(err){
            return res.status(500).send("Internal server error occured")
        }
    }
    else return res.status(400).send(result.message);
}

export async function getMarkTimes(req: Request, res: Response, next: NextFunction){
    let result = validateGetMarkTimesQuery(req.query);
    if (result.ok){
        try {
            let data = await markerService.getMarkTimes(result.value.pvi)
            res.send(data)
        }
        catch (err){
            return res.status(500).send("Internal server error occured")
        }
    }
    else return res.status(400).send(result.message)
}