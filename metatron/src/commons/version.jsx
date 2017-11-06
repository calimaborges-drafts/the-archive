import React from 'react';
import PropTypes from 'prop-types';

const Version = ({ version }) => (
  <div style={{ position: 'absolute', right: 0, top: 0, fontSize: '8px', padding: '4px', color: '#aaa' }}>
    { version }
  </div>
);

Version.propTypes = {
  version: PropTypes.string.isRequired,
};

export default Version;
