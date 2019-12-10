import React, { useState, useEffect } from 'react';

const LoanType = ({ parentCallback }) => {

    const [warrantyTypes] = useState([
        { type: 'Veículo', terms: [24, 36, 48], maxWarranty: 100000.0, minWarranty: 3000.0 },
        { type: 'Imóvel', terms: [120, 180, 240], maxWarranty: 4500000.0, minWarranty: 30000.0 }])
    const [warranty, setWarranty] = useState('Veículo')
    const [terms, setTerms] = useState([24, 36, 48])
    const [term, setTerm] = useState(24)
    const [maxWarranty, setmaxWarranty] = useState(100000.0)
    const [minWarranty, setminWarranty] = useState(3000.0)
    const [warrantyAmount, setWarrantyAmount] = useState(0)
    const [warrantyRange, setWarrantyRange] = useState(0)
    const [loanAmount, setLoanAmount] = useState(0)
    const [loanRange, setLoanRange] = useState(0)

    useEffect(() => {
        setLoanAmount(loanRange)
    }, [loanRange, loanAmount])

    useEffect(() => {
        setWarrantyAmount(warrantyRange)
    }, [warrantyRange, warrantyAmount])

    useEffect(() => {
        const loanType = warrantyTypes.find((e) => { return e.type === warranty; })
        setTerms(loanType.terms)
        setmaxWarranty(loanType.maxWarranty)
        setminWarranty(loanType.minWarranty)
        setWarrantyAmount(loanType.minWarranty)
        setWarrantyRange(loanType.minWarranty)
        setLoanAmount(loanType.minWarranty)
        setLoanRange(loanType.minWarranty)
    }, [warranty])

    useEffect(() => {
        if (term > 0 && loanAmount > 0)
            parentCallback({ term, warranty, warrantyAmount, warrantyRange, loanAmount, loanRange, });
    }, [loanAmount, term])

    return (
        <div className="form__fields">
            <div className="field-group">
                <div className="field">
                    <label >Número de parcelas</label>
                    <select onChange={(e) => setTerm(e.target.value)}>
                        {
                            terms.map((term, index) => (
                                <option key={index} value={term}>{term}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="field">
                    <label >Garantia </label>
                    <select onChange={(e) => setWarranty(e.target.value)} >
                        {
                            warrantyTypes.map((warranty, index) => (
                                <option key={index} value={warranty.type}>{warranty.type}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="valor-garantia">
                <div className="field-group">
                    <div className="field">
                        <label >Valor da Garantia</label>
                        <input type="text" value={warrantyAmount} onChange={(e) => setWarrantyAmount(e.target.value)} />
                    </div>
                    <div className="field">
                        <div className="range">
                            <input onChange={(e) => setWarrantyRange(e.target.value)} type="range" min={minWarranty} max={maxWarranty} value={warrantyRange} step="10" />
                            <div className="range__values">
                                <span>{minWarranty}</span>
                                <span>{maxWarranty}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="emprestimo">
                <div className="field-group">
                    <div className="field">
                        <label>Valor do Empréstimo</label>
                        <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                    </div>
                    <div className="field">
                        <div className="range">
                            <input onChange={(e) => setLoanRange(e.target.value)} type="range" min={minWarranty} max={maxWarranty * 0.8} value={loanRange} step="10" />
                            <div className="range__values">
                                <span>{minWarranty}</span>
                                <span>{maxWarranty * 0.8}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanType;