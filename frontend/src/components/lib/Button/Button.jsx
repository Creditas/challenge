/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Button = ({ text, type, onClick }) => (
    <button
        type={type}
        onClick={onClick}
        {...styles}
        data-testid="button"
    >
        {text}
    </button>
);
Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'button',
    text: '',
    onClick: () => ({}),
};

export default Button;
