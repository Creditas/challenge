package br.com.creditas.factories;

import br.com.creditas.enums.PaymentType;
import br.com.creditas.services.CreditCardPaymentService;
import br.com.creditas.services.DebitCardPaymentService;
import br.com.creditas.services.PaymentService;

import static br.com.creditas.enums.PaymentType.CREDIT_CARD;

public class PaymentServiceFactory {
    public static PaymentService getInstance(PaymentType paymentType) {
        return CREDIT_CARD == paymentType ? new CreditCardPaymentService() : new DebitCardPaymentService();
    }
}
