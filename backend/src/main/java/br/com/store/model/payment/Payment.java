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
    private boolean isUsedVoucher = false;

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
        amount = amount - this.voucherValue;
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
        System.out.println("AMOUNT VALUE = " + this.amount);
        invoice.setMemberships(invoice.activateMembership(this.order.getItems()));
        this.invoice = invoice;
        return invoice;
    }

    public boolean isPaid() {
        return this.invoice != null;
    }

    private ArrayList<OrderDescription> createOrderDescriptions() {

        ArrayList<OrderDescription> orderDescriptions = new ArrayList<OrderDescription>();

        for (Product item : this.order.getItems()) {
            orderDescriptions.add(item.getType().process(this.order, this, isUsedVoucher));
        }

        return orderDescriptions;
    }

    public void setVoucherValue(Double voucherValue) {
        this.voucherValue = voucherValue;
        this.isUsedVoucher = true;
    }

    public ArrayList<OrderDescription> getOrderDescriptions() {
        return orderDescriptions;
    }
}
