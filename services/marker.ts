import {getTable, updateMarkValue} from "../models/db"

export class Marker {
    async getLast(){
        return (await getTable())
    }
    async updateMarkValue(pvi: number, marked: boolean){
        return (await updateMarkValue(pvi, marked))
    }
}