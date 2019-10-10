import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function NavTab(props) {
    const { to, label } = props;

    return (<Link to={to} label={label}/>);
}

NavTab.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}

export default NavTab;