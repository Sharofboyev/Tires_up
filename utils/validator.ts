import { Request } from "express";

export type Result<T> = 
    | { ok: true, value: T }
    | { ok: false, message: string }

export interface UpdateMark {
    pvi: number,
    marked: boolean
}

export interface FilterQuery{
    limit?: number,
    pvi?: number
}

export function isString(obj: any): obj is string {
    return typeof obj === "string";
}

export function isNumber(obj: any): obj is number {
    return typeof obj === "number"
}

export function isBoolean(obj: any): obj is boolean {
    return typeof obj === "boolean";
}

const min = (min: number, actual: number) => actual >= min;
const error: <T>(message: string) => Result<T> = message => ({
    ok: false,
    message: message
})

export function validateMarkUpdate(body: any): Result<UpdateMark> {
    if (!isNumber(body.pvi)) {
        return error(`PVI must be a number but was ${typeof body.pvi}`);
    } else if (!min(0, body.pvi)) {
        return error(`PVI must not be negative but was ${body.pvi}`);
    }

    if (!isBoolean(body.marked)) {
        return error (`Marked must be a boolean but was ${typeof body.marked}`);
    }

    return {
        ok: true,
        value: body
    }
}

export function validateRequestQuery(query: any): Result<FilterQuery> {
    if (query.pvi){
        query.pvi = Number(query.pvi)
        if (query.pvi === NaN) {
            return error(`PVI must be a valid number`);
        } else if (!min(0, query.pvi)) {
            return error(`PVI must not be negative but was ${query.pvi}`);
        }
    }

    if (query.limit){
        query.limit = Number(query.limit)
        if (query.limit === NaN) {
            return error(`Limit property should be a valid number`);
        } else if (!min(1, query.limit)) {
            return error(`Limit must not be less than 1 but was ${query.limit}`);
        }
    }

    return {
        ok: true,
        value: query
    }
}