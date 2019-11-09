/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Button = ({ text, type, onClick }) => (
    <button
        type={type}
        onClick={onClick}
        {...styles}
    >
        {text}
    </button>
);
Button.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    text: '',
};

export default Button;
