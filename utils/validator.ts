import { Request } from "express";

export type Result<T> = 
    | { ok: true, value: T }
    | { ok: false, message: string }

export interface UpdateMark {
    pvi: number,
    marked: boolean
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