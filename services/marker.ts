import { getMarkTimes, getTable, updateMarkValue } from "../models/db";

export class Marker {
  async getLast(viewName: string, limit?: number, pvi?: number) {
    if (pvi) limit = 1;
    return await getTable(viewName, limit, pvi);
  }
  async updateMarkValue(pvi: number, marked: boolean) {
    return await updateMarkValue(pvi, marked);
  }
  async getMarkTimes(pvi: number) {
    return await getMarkTimes(pvi);
  }
}
