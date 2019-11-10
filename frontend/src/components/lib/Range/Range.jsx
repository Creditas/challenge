import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../../../helpers';

import styles from './styles';

const Range = ({
    value, onChange, id, required, width, disabled, min, max, step,
}) => (
    <div {...styles(width)}>
        <input
            id={id}
            name={id}
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            required={required}
            disabled={disabled}
            data-testid="range"
        />
        <div className="range__values">
            <span>{numberWithCommas(min)}</span>
            <span>{numberWithCommas(max)}</span>
        </div>
    </div>
);

Range.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

Range.defaultProps = {
    width: 150,
    required: false,
    disabled: false,
    min: 0,
    max: 0,
};

export default Range;
