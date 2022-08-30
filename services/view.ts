import { getViews, updateView, removeView } from "../models/db";
import { View as ViewInterface } from "../utils/validator";

export class View {
  async getViews() {
    return await getViews();
  }

  async updateView(view: ViewInterface) {
    await updateView(view.name, view.query);
  }

  async removeView(name: string) {
    await removeView(name);
  }
}
