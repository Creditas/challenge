import React from 'react';

const Quota = (props) => {
    const iof = 6.38
    const tax = 2.34
    const taxMonth = tax * props.term
    const totalAmount = ((iof / 100) + (tax / 100) + (props.term / 1000) + 1) * props.loanAmount
    const portionValue = totalAmount / props.term

    return (
        <div className="form__result" >
            <div className="quota__container">
                <h4>Valor da Parcela</h4>
                <div className="quota">
                    <strong>R$</strong>
                    {props.loanAmount && <span>{portionValue}</span>}
                </div>
            </div>
            <div className="amount_container">
                <h4>Total a pagar</h4>
                {props.loanAmount && <p>R$ {totalAmount}</p>}
            </div>
            <div className="tax__container">
                <h4>Taxa de juros (mês)</h4>
                {props.loanAmount && <p>{taxMonth}%</p>}
            </div>
            <button type="button" onClick={props.handleShowModal} className="button">
                Solicitar
            </button>
        </div>
    )
}
export default Quota;