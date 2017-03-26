package br.com.store.model.payment;

import br.com.store.model.order.*;
import br.com.store.model.product.Product;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */

public class Payment {

    private String autorizationNumber;
    private Double amount;
    private Order order;
    private Invoice invoice;
    private Calendar paidAt;
    private PaymentMethod paymentMethod;
    private ArrayList<OrderDescription> orderDescriptions;
    private Double voucherValue = 0.00;

    public Payment(String autorizationNumber, Order order, Calendar paidAt, PaymentMethod paymentMethod) {
        this.autorizationNumber = autorizationNumber;
        this.order = order;
        this.paidAt = paidAt;
        this.paymentMethod = paymentMethod;
        this.orderDescriptions = this.createOrderDescriptions();
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
        return this.invoice != null;
    }

    private ArrayList<OrderDescription> createOrderDescriptions() {

        ArrayList<OrderDescription> orderDescriptions = new ArrayList<OrderDescription>();
        if(this.order.getItems().size() > 0) {
            if (this.order.hasBook(this.order.getItems())) {
                ShippingLabel orderDescription = new ShippingLabel(this.order.getAddress().getZipCode(), this.order.getAddress());
                orderDescription.setDescription("This item doesn't require taxes");
                this.voucherValue = 10.00;
                orderDescriptions.add(orderDescription);
            } else if (this.order.hasDigitalOrSignature(this.order.getItems())) {
                EmailNotification orderDescription = new EmailNotification();
                orderDescription.createEmail(this.order.getDigitalProducts(this.order.getItems()));
                orderDescriptions.add(orderDescription);
            } else {
                ShippingLabel orderDescription = new ShippingLabel(this.order.getAddress().getZipCode(), this.order.getAddress());
                orderDescriptions.add(orderDescription);
            }
        }
        return orderDescriptions;
    }

    public ArrayList<OrderDescription> getOrderDescriptions() {
        return orderDescriptions;
    }
}
