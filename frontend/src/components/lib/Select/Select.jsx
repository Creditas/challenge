import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({
    text, options, value, onChange, id, required, width, disabled,
}) => (
    <div {...styles(width)}>
        <label htmlFor={id}>{text}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
        >
            {
                options.map((opt) => (
                    <option key={`key-${opt.value}-${opt.text}`} value={opt.value}>
                        {opt.text}
                    </option>
                ))
            }
        </select>
    </div>
);

Input.propTypes = {
    width: PropTypes.number,
    text: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }),
    ),
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    width: 150,
    options: [{ value: '1', text: '1' }, { value: '2', text: '2' }],
    text: '',
    required: false,
    disabled: false,
};

export default Input;
