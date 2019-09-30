package br.com.creditas.models;

import br.com.creditas.enums.PaymentType;

public class Payment {

    private PaymentType paymentType;
    private PaymentMethod paymentMethod;

    public Payment() { }
    public Payment(PaymentType paymentType, PaymentMethod paymentMethod) {
        this.paymentType = paymentType;
        this.paymentMethod = paymentMethod;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }
}
