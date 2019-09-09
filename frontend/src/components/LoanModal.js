import React from 'react';
import Modal from 'react-modal';

const LoanModal = (props) => {
    return (
        <Modal
            isOpen={props.showModal}
            contentLabel={"Confirmação"}
            onRequestClose={props.handleShowModal}
            appElement={document.getElementById('app')}
            className="modal"
        >
            <div>
                <h1 className="main__title">Confirmação:</h1>
                <div className="form__fields">
                    <div className="field-group">
                        <div className="field">
                            <label >Número de parcelas</label>
                            <input type="text" value={props.loanObject.term} readOnly />
                        </div>
                        <div className="field">
                            <label >Garantia </label>
                            <input type="text" value={props.loanObject.warranty} readOnly />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label >Valor da Garantia</label>
                            <input type="text" value={props.loanObject.warrantyAmount} readOnly />
                        </div>
                        <div className="field">
                            <label >Range da Garantia</label>
                            <input type="text" value={props.loanObject.warrantyRange} readOnly />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Valor do Empréstimo</label>
                            <input type="text" value={props.loanObject.loanAmount} readOnly />
                        </div>
                        <div className="field">
                            <label >Range do Empréstimo</label>
                            <input type="text" value={props.loanObject.loanRange} readOnly />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="amount_container">
                            <label>Valor do Total</label>
                            <strong>R$ </strong>
                            <span>{props.totalAmount}</span>
                        </div>
                    </div>
                </div>
                <button onClick={props.handleShowModal} type="button" className="button">
                    OK
            </button>
            </div>
        </Modal>
    )
}

export default LoanModal;