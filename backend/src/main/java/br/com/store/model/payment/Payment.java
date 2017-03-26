package br.com.store.model.payment;

import br.com.store.model.order.Invoice;
import br.com.store.model.order.Order;
import br.com.store.model.order.OrderDescription;
import br.com.store.model.order.ShippingLabel;
import br.com.store.model.product.Product;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */

public class Payment {

    String autorizationNumber;
    Double amount;
    Order order;
    Invoice invoice;
    Calendar paidAt;
    PaymentMethod paymentMethod;
    OrderDescription orderDescription;
    Double voucherValue = 0.00;

    public Payment(String autorizationNumber, Order order, Calendar paidAt, PaymentMethod paymentMethod) {
        this.autorizationNumber = autorizationNumber;
        this.order = order;
        this.paidAt = paidAt;
        this.paymentMethod = paymentMethod;
        this.orderDescription = this.createOrderDescription();
    }

    public Double getAmount(ArrayList<Product> items) {
        Double amount = 0.0;
        for (Product product : items) {
            amount += product.getPrice();
        }
        amount = amount - voucherValue;
        if (amount < 0.00) {
            amount = 0.00;
        }
        return amount;
    }

    public Invoice pay() {
        Invoice invoice = new Invoice(this.order.getAddress().getBillingAddress(), this.order.getAddress().getShippingAddress());
        this.autorizationNumber = String.valueOf(System.currentTimeMillis());
        this.order.setClosedAt(Calendar.getInstance());
        this.paidAt = Calendar.getInstance();
        this.amount = this.getAmount(order.getItems());
        invoice.setMemberships(invoice.activateMembership(this.order.getItems()));
        this.invoice = invoice;
        return invoice;
    }

    public boolean isPaid() {
        return this.paidAt != null;
    }

    private OrderDescription createOrderDescription() {
        OrderDescription orderDescription = new OrderDescription();

        if(this.order.getItems().size() > 0) {
            if (this.order.hasBook(this.order.getItems())) {
                orderDescription = new ShippingLabel(this.order.getAddress().getZipCode(), this.order.getAddress());
                orderDescription.setDescription("This item doesn't require taxes");
                this.voucherValue = 10.00;
            } else if (this.order.hasDigitalOrSignature(this.order.getItems())) {
                orderDescription.createEmail(this.order.getDigitalProducts(this.order.getItems()));
            } else {
                orderDescription = new ShippingLabel(this.order.getAddress().getZipCode(), this.order.getAddress());
            }
        }
        return orderDescription;
    }


}
