import PropTypes from 'prop-types';

export const createSnippet = (identifier = '', text = '') => ({ identifier, text });

export const snippetPropType = PropTypes.shape({
  identifier: PropTypes.string,
  text: PropTypes.string,
});
