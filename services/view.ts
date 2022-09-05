import {
  getViews,
  updateView,
  removeView,
  addView,
  hasThisView,
} from "../models/db";
import { View as ViewInterface } from "../utils/validator";

export class View {
  async getViews(name?: string) {
    if (name) {
      return await getViews(name);
    }
    return await getViews();
  }

  async updateView(view: ViewInterface) {
    await updateView(view.name, view.query);
  }

  async removeView(name: string) {
    await removeView(name);
  }

  async addView(name: string, query: string) {
    await addView(name, query);
  }

  async hasView(name: string) {
    return await hasThisView(name);
  }
}
