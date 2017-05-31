package br.com.store.model.purchase;

import br.com.store.model.customer.Customer;
import br.com.store.model.order.Order;
import br.com.store.model.payment.CreditCard;
import br.com.store.model.payment.Payment;
import br.com.store.model.product.Product;
import br.com.store.model.product.Type;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */
public class Purchase {

    public static void main(String [] args) {

        Customer foolano = new Customer("Joseph");
        Product book = new Product("Guia do Mochileiro das Galáxias", 30.00, Type.BOOK);

        Calendar today = Calendar.getInstance();
        Order order = new Order(foolano, today, "12312312", "Rua das Tripécias", "Rua das Tripécias");
        order.addItem(book);

        Payment payment = new Payment("1231231", order, today, new CreditCard());
        payment.pay();
        payment.isPaid();
    }

}
