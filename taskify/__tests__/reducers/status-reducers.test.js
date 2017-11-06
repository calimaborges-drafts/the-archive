import deepFreeze from "deep-freeze";

import { status } from "../../src/misc/redux/reducers/status-reducers";
import * as t from "../../src/misc/redux/types";

const initialState = {};
deepFreeze(initialState);

test("should store status", () => {
  const testObj = {
    env: "production",
    heroku: "v99",
    name: "taskify-api",
    version: "1.0.0"
  };
  const action = {
    type: t.FETCH_STATUS_SUCCESS,
    status: testObj
  };

  const state = status(initialState, action);
  expect(state).toEqual(testObj);
});
