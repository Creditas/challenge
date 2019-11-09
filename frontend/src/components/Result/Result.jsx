import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Lib/Button';
import { numberWithCommas } from 'Helpers';
import styles from './styles';


const Result = ({ handleSubmit, result }) => (
    <div {...styles}>
        <div className="result__container">
            <h4 className="result__title">Valor da Parcela</h4>
            <div className="quota__container">
                <p className="quota__text">
                    R$
                    <span>{numberWithCommas(result.monthlyPayment)}</span>
                </p>
            </div>
        </div>
        <div className="result__container">
            <h4 className="result__title">Total a pagar</h4>
            <p className="result__text">
                {`R$${numberWithCommas(result.total)}`}
            </p>
        </div>
        <div className="result__container">
            <h4 className="result__title">Taxa de juros (mês)</h4>
            <p className="result__text">
                {`${numberWithCommas(result.interestRate)}%`}
            </p>
        </div>
        <Button
            type="submit"
            text="Solicitar"
            onClick={handleSubmit}
        />
    </div>
);


Result.propTypes = {
    result: PropTypes.shape({
        monthlyPayment: PropTypes.string,
        total: PropTypes.string,
        interestRate: PropTypes.string,
    }),
    handleSubmit: PropTypes.func,
};

Result.defaultProps = {
    result: {
        monthlyPayment: '',
        total: '',
        interestRate: '',
    },
    handleSubmit: () => ({}),
};

export default Result;
