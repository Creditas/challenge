import React from 'react';
import Header from './Header';
import LoanType from './LoanType';
import Quota from './Quota';
import LoanModal from './LoanModal';

class CreditasChallenge extends React.Component {
    state = {
        showModal: false,
        loanObject: {
            term: 0,
            warranty: 0,
            warrantyAmount: 0,
            warrantyRange: 0,
            loanAmount: 0,
            loanRange: 0
        },
        taxMonth: 0,
        totalAmount: 0,
        portionValue: 0
    }

    setQuotaObject = () => {
        this.setState(() => ({ taxMonth: (2.34 * this.state.loanObject.term) }));
        this.setState(() => ({ totalAmount: ((6.38 / 100) + (2.34 / 100) + (this.state.loanObject.term / 1000) + 1) * this.state.loanObject.loanAmount }));
        this.setState(() => ({ portionValue: this.state.totalAmount / this.state.loanObject.term }));        
    }

    loanTypeCallback = (loanObject) => {
        this.setState(() => ({
            loanObject: {
                term: loanObject.term,
                warranty: loanObject.warranty,
                warrantyAmount: loanObject.warrantyAmount,
                warrantyRange: loanObject.warrantyRange,
                loanAmount: loanObject.loanAmount,
                loanRange: loanObject.loanRange
            }
        }));
        this.setQuotaObject();
    }

    handleShowModal = () => {
        const inverse = !this.state.showModal
        this.setState(() => ({ showModal: inverse }));
    }

    render() {
        return (
            <div className="container">
                <Header />
                <main className="main">
                    <h1 className="main__title">Realize uma simulação de crédito utilizando seu bem como garantia.</h1>
                    <section className="section__container">
                        <form className="form" name="form">
                            <LoanType parentCallback={this.loanTypeCallback} />
                            <Quota
                                term={this.state.loanObject.term}
                                loanAmount={this.state.loanObject.loanAmount}
                                handleShowModal={this.handleShowModal}
                            />
                        </form>
                    </section>
                    <footer className="footer">*Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quas non harum dolor eligendi id, ab corrupti blanditiis suscipit ex odit error alias minus. Enim dolores eum officiis quae rem!*</footer>
                </main>
                <LoanModal
                    showModal={this.state.showModal}
                    handleShowModal={this.handleShowModal}
                    loanObject={this.state.loanObject}
                    //taxMonth={this.state.taxMonth}
                    totalAmount={this.state.totalAmount}
                    //portionValue={this.state.portionValue}
                ></LoanModal>
            </div>
        )
    }
}

export default CreditasChallenge;