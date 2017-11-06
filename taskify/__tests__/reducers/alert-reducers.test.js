import deepFreeze from "deep-freeze";

import { alerts } from "../../src/misc/redux/reducers/alert-reducers";
import * as t from "../../src/misc/redux/types";

const initialState = [
  {
    type: "initial-style",
    headline: "initial-headline",
    message: "initial-message",
    id: "initial-unique-id"
  }
];
deepFreeze(initialState);

test("should add alert to previous empty state", () => {
  const alert = {
    type: "test-style",
    headline: "Test Headline",
    message: "Test message",
    id: "unique-id"
  };

  const action = {
    type: t.ADD_ALERT,
    alert
  };

  const state = alerts(initialState, action);
  expect(state).toEqual([...initialState, { ...alert }]);
});

test("should dismiss alert to previous empty state", () => {
  const action = {
    type: t.DISMISS_ALERT,
    alert: { id: "initial-unique-id" }
  };

  const state = alerts(initialState, action);
  expect(state).toEqual([]);
});
