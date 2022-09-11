import {
  getViews,
  updateView,
  removeView,
  addView,
  hasThisView,
} from "../models/db";
import { View as ViewInterface } from "../utils/validator";

export class View {
  getViews(name?: string) {
    if (name) {
      return getViews(name);
    }
    return getViews();
  }

  updateView(view: ViewInterface) {
    return updateView(view.name, view.query);
  }

  removeView(name: string) {
    removeView(name);
  }

  addView(name: string, query: string) {
    return addView(name, query);
  }

  async hasView(name: string) {
    return await hasThisView(name);
  }
}
