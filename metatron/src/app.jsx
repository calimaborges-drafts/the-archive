import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { remote } from 'electron';

import * as ct from './misc/context-types';
import { fetchSnippets } from './snippets/snippet-actions';

import Main from './main/main';
import EditSnippet from './snippets/components/edit-snippet';
import WrongComponent from './commons/wrong-component';

const { store } = remote.require(`${__dirname}/misc/main-factory`);

const getSnippetFromArray = (identifier, snippets) => snippets.filter(
  snippet => snippet.identifier === identifier,
)[0];

const mainComponent = () => {
  const { context, snippets, snippetEdit, filter } = store.getState();
  switch (context) {
    case ct.MAIN:
      return <Main snippets={snippets} filter={filter} />;
    case ct.EDIT_SNIPPET:
      return <EditSnippet snippet={getSnippetFromArray(snippetEdit, snippets)} />;
    default:
      return <WrongComponent />;
  }
};

const render = () => {
  ReactDOM.render(<AppContainer>{ mainComponent() }</AppContainer>, document.getElementById('root'));
};

store.subscribe(render);

if (module.hot) {
  module.hot.accept(render);
}

render();

store.dispatch(fetchSnippets());
