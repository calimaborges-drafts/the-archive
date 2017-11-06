import { v4 } from "uuid";
import * as t from "../types";

export const addAlert = (style, headline, message) => ({
  type: t.ADD_ALERT,
  alert: { id: v4(), style, headline, message }
});

export const dismissAlert = alert => ({
  type: t.DISMISS_ALERT,
  alert
});
