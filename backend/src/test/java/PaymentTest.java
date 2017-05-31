import br.com.store.model.customer.Customer;
import br.com.store.model.order.Invoice;
import br.com.store.model.order.Order;
import br.com.store.model.payment.CreditCard;
import br.com.store.model.payment.Payment;
import br.com.store.model.product.Product;
import br.com.store.model.product.Type;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */
public class PaymentTest {

    Customer foolado = new Customer("foolano");
    @Test
    public void testAmountWithDiscount() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Guia dos Curiosos", 10.00, Type.BOOK));
        order.addItem(new Product("HQ", 10.00, Type.BOOK));
        order.addItem(new Product("Livro XPTO", 10.00, Type.BOOK));
        ArrayList<Product> products = order.getItems();
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        Double amount = payment.getAmount(products);
        assert amount == 20.00;
    }

    @Test
    public void testAmountWithoutDiscount() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.DIGITAL_VIDEO));
        order.addItem(new Product("Another CD", 10.00, Type.DIGITAL_MUSIC));
        order.addItem(new Product("Another Digital CD", 10.00, Type.DIGITAL_MUSIC));
        ArrayList<Product> products = order.getItems();
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        Double amount = payment.getAmount(products);
        assert amount == 30.00;
    }

    @Test
    public void testPayWithoutMembership(){
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Guia dos Curiosos", 10.00, Type.BOOK));
        order.addItem(new Product("HQ", 10.00, Type.BOOK));
        order.addItem(new Product("Livro XPTO", 10.00, Type.BOOK));
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        Invoice invoice = payment.pay();
        assert invoice.getMemberships().size() == 0;
    }

    @Test
    public void testPayWithMembership(){
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Spotify", 10.00, Type.MEMBERSHIP));
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        Invoice invoice = payment.pay();
        assert invoice.getMemberships().size() == 1;
    }

    @Test
    public void testIfSomePaymentWasPaid(){
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Spotify", 10.00, Type.MEMBERSHIP));
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        payment.pay();
        assert payment.isPaid();
    }

    @Test
    public void testIfSomePaymentWasNOTPaid(){
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Spotify", 10.00, Type.MEMBERSHIP));
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        assert !payment.isPaid();
    }

    @Test
    public void testOrderDiscription(){
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Guia dos Curiosos", 10.00, Type.BOOK));
        order.addItem(new Product("HQ", 10.00, Type.BOOK));
        order.addItem(new Product("Livro XPTO", 10.00, Type.BOOK));
        Payment payment = new Payment("12312312312", order, Calendar.getInstance(), new CreditCard());
        assert payment.getOrderDescriptions().size() == 1;
        assert payment.getOrderDescriptions().get(0).getDescription().equals("This item doesn't require taxes");
    }
}
