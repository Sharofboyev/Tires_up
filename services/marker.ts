import {getTable, updateMarkValue} from "../models/db"

export class Marker {
    async getLast(limit?: number, pvi?: number){
        if (pvi) limit = 1;
        return (await getTable(limit, pvi))
    }
    async updateMarkValue(pvi: number, marked: boolean){
        return (await updateMarkValue(pvi, marked))
    }
}