import React, { Component } from 'react';

import { snippetPropType, createSnippet } from '../snippet-model';
import { pd } from '../../commons/prevent-default';

import { MAIN } from '../../misc/context-types';
import { setCurrentContext } from '../../misc/actions';
import { saveSnippet } from '../snippet-actions';

import { store } from '../../misc/remote-factory';

class EditSnippet extends Component {
  constructor({ snippet }) {
    super();

    this.state = { ...snippet };
    this.handleChange = field => event => this.setState({
      [field]: event.target.value,
    });

    this.handleSubmit = pd(
      () => store.dispatch(saveSnippet(this.state.identifier, this.state.text)),
    );
  }
  render() {
    return (
      <div className="edit-snippet-container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Identificador" onChange={this.handleChange('identifier')} value={this.state.identifier} />
          <textarea placeholder="Autotexto" onChange={this.handleChange('text')} value={this.state.text} />
          <div className="action-buttons">
            <button type="submit">Salvar autotexto</button>
            <button type="button" onClick={() => store.dispatch(setCurrentContext(MAIN))}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditSnippet.defaultProps = {
  snippet: createSnippet(),
};

EditSnippet.propTypes = {
  snippet: snippetPropType,
};

export default EditSnippet;
