import React, { Component } from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
    <Link to={filter === 'all' ? '' : filter} activeStyle={{
            textDecoration: 'none',
            color: 'back'
        }}
    >
        { children }
    </Link>
)

export default FilterLink;
