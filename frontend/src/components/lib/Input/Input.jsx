import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({
    text, type, value, onChange, id, required, width, disabled,
}) => (
    <div {...styles(width)}>
        <label htmlFor={id} data-testid="Label">{text}</label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            data-testid="Input"
        />
    </div>
);

Input.propTypes = {
    width: PropTypes.number,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    width: 150,
    text: '',
    value: '',
    required: false,
    disabled: false,
    onChange: () => ({}),
};

export default Input;
