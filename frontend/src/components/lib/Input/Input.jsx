import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({
    text, type, value, onChange, id, required, width, disabled,
}) => (
    <div {...styles(width)}>
        <label htmlFor={id}>{text}</label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
        />
    </div>
);

Input.propTypes = {
    width: PropTypes.number,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    width: 150,
    text: '',
    required: false,
    disabled: false,
    onChange: () => ({}),
};

export default Input;
