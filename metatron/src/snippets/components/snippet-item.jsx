import React from 'react';
import { snippetPropType } from '../snippet-model';
import { store } from '../../misc/remote-factory';
import { deleteSnippet, editSnippet, copySnippetToClipboard } from '../snippet-actions';


const SnippetItem = ({ snippet }) => (
  <div className="snippet-item">
    <h1>{snippet.identifier}</h1>
    <pre><code>
      {snippet.text}
    </code></pre>
    <div className="action-buttons">
      <button type="button" onClick={() => store.dispatch(copySnippetToClipboard(snippet.text))}>
        Copiar
      </button>
      <button type="button" onClick={() => store.dispatch(editSnippet(snippet.identifier))}>
        Editar
      </button>
      <button type="button" onClick={() => store.dispatch(deleteSnippet(snippet.identifier))}>
        Apagar
      </button>
    </div>
    <hr />
  </div>
);

SnippetItem.propTypes = {
  snippet: snippetPropType.isRequired,
};

export default SnippetItem;
