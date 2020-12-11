import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function NavTab(props) {
    const { to, label, handleChange } = props;

    return (<Link to={to} label={label} onClick={handleChange} />);
}

NavTab.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default NavTab;