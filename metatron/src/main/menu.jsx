import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ order, children }) => (
  <div>{children}</div>
);

MenuItem.propTypes = {
  order: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export { MenuItem };

export default {};
