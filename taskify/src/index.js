import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/npm";
import "./index.css";

import { store, router } from "./misc/factory";
import { fetchStatus } from "./misc/redux/actions/root-actions";

import App from "./App";
import { prepareTaskForm } from "./misc/redux/actions/task-actions";

const render = () => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root")
  );
};

router.subscribe(render);
router.subscribe(() => {
  if (router.isRoot()) {
    router.goto("/tasks");
  } else if (router.match(/^\/tasks\/new$/)) {
    store.dispatch(prepareTaskForm());
  } else if (router.match(/^\/tasks\/edit\/([^/]+)$/)) {
    store.dispatch(prepareTaskForm(router.getMatchedParams()[1]));
  }

  if (!router.hasQueryString()) {
    router.setQueryString({ type: "inbox" });
  }
});

router.dispatch();

store.dispatch(fetchStatus());
