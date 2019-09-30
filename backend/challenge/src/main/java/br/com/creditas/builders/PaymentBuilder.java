package br.com.creditas.builders;

import br.com.creditas.enums.PaymentType;
import br.com.creditas.models.CreditCard;
import br.com.creditas.models.Payment;
import br.com.creditas.models.PaymentMethod;
import javafx.beans.property.adapter.JavaBeanBooleanPropertyBuilder;

public class PaymentBuilder {

    private PaymentType paymentType;
    private PaymentMethod paymentMethod;

    public PaymentBuilder paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public PaymentBuilder paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public Payment build() {
        return new Payment(paymentType, paymentMethod);
    }
}
