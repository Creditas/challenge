import React from 'react';
import PropTypes from 'prop-types';

import Input from 'Lib/Input';
import Select from 'Lib/Select';
import Range from 'Lib/Range';
import { numberWithCommas } from 'Helpers';

import styles from './styles';

const Fields = ({
    active,
    guaranteeOptions,
    handleChangeInputs,
    handleChangeGuarantee,
}) => (
    <div className="fields" {...styles}>
        <div className="fields__group">
            <Select
                id="valueMonth"
                text="Número de parcelas"
                value={String(active.valueMonth)}
                onChange={handleChangeInputs}
                options={active.months}
                required
            />
            <Input
                id="guarantee"
                type="text"
                text="Valor da Garantia"
                value={numberWithCommas(active.valueGuarantee)}
                disabled
            />
            <Input
                id="loan"
                type="text"
                text="Valor de prestamo"
                value={numberWithCommas(active.valueLoan)}
                disabled
            />
        </div>
        <div className="fields__group">
            <Select
                id="guaranteeActive"
                text="Garantia"
                value={active.guaranteeActive}
                onChange={handleChangeGuarantee}
                options={guaranteeOptions}
                required
            />
            <Range
                id="valueGuarantee"
                value={Number(active.valueGuarantee)}
                min={active.min}
                max={active.max}
                step={10}
                onChange={handleChangeInputs}
            />
            <Range
                id="valueLoan"
                value={Number(active.valueLoan)}
                min={active.minLoan}
                max={active.maxLoan}
                step={10}
                onChange={handleChangeInputs}
            />
        </div>
    </div>
);


Fields.propTypes = {
    guaranteeOptions: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }),
    ),
    active: PropTypes.shape({
        valueMonth: PropTypes.string,
        months: PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }),
        ),
        valueGuarantee: PropTypes.number,
        valueLoan: PropTypes.number,
        guaranteeActive: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        minLoan: PropTypes.number,
        maxLoan: PropTypes.number,
    }),
    handleChangeGuarantee: PropTypes.func,
    handleChangeInputs: PropTypes.func,
};

Fields.defaultProps = {
    guaranteeOptions: [],
    active: {
        valueMonth: '',
        months: [],
        valueGuarantee: '',
        valueLoan: 0,
        guaranteeActive: '',
        min: 0,
        max: 0,
        minLoan: 0,
        maxLoan: 0,
    },
    handleChangeGuarantee: () => ({}),
    handleChangeInputs: () => ({}),
};


export default Fields;
