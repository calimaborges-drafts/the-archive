import * as t from '../misc/action-types';
import * as ct from '../misc/context-types';
import { save, list, remove, copyToClipboard } from './snippets-persistence';
import { requestFailed, setCurrentContext } from '../misc/actions';

export const fetchSnippets = () => async (dispatch) => {
  dispatch({ type: t.REQUEST_FETCH_SNIPPET });
  try {
    const snippets = await list();
    dispatch({ type: t.SUCCESS_FETCH_SNIPPET, snippets });
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const saveSnippet = (identifier, text) => async (dispatch) => {
  dispatch({ type: t.REQUEST_SAVE_SNIPPET });
  try {
    await save(identifier, text);
    dispatch({ type: t.SUCCESS_SAVE_SNIPPET, identifier, text });
    dispatch(fetchSnippets());
    dispatch(setCurrentContext(ct.MAIN));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const deleteSnippet = identifier => async (dispatch) => {
  dispatch({ type: t.REQUEST_DELETE_SNIPPET });
  try {
    await remove(identifier);
    dispatch({ type: t.SUCCESS_DELETE_SNIPPET });
    dispatch(fetchSnippets());
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const editSnippet = identifier => async (dispatch) => {
  dispatch({ type: t.EDIT_SNIPPET, identifier });
  dispatch(setCurrentContext(ct.EDIT_SNIPPET));
};

export const copySnippetToClipboard = text => (dispatch) => {
  dispatch({ type: t.COPY_SNIPPET_CLIPBOARD });
  copyToClipboard(text);
};
