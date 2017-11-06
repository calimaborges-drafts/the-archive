import React from 'react';
import { setCurrentContext } from '../../misc/actions';
import { EDIT_SNIPPET } from '../../misc/context-types';
import { store } from '../../misc/remote-factory';

const onClick = (event) => {
  event.preventDefault();
  store.dispatch(setCurrentContext(EDIT_SNIPPET));
};

const AddButton = () => (
  <div>
    <a href="add_button" onClick={onClick}>Adicionar Autotexto</a>
  </div>
);

export default AddButton;
