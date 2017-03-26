import br.com.store.model.customer.Customer;
import br.com.store.model.order.Order;
import br.com.store.model.product.Product;
import br.com.store.model.product.Type;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * Created by tinguan on 26/03/17.
 */
public class OrderTest {

    Customer foolado = new Customer("foolano");

    @Test
    public void testTheresntBooksInTheOrder() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.DIGITAL_VIDEO));
        order.addItem(new Product("Another CD", 10.00, Type.DIGITAL_MUSIC));
        order.addItem(new Product("Another Digital CD", 10.00, Type.DIGITAL_MUSIC));
        ArrayList<Product> products = order.getItems();
        assert !order.hasBook(products);
    }

    @Test
    public void testTheresBooksInTheOrder() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.BOOK));
        order.addItem(new Product("Another CD", 10.00, Type.DIGITAL_MUSIC));
        order.addItem(new Product("Another Digital CD", 10.00, Type.DIGITAL_MUSIC));
        ArrayList<Product> products = order.getItems();
        assert order.hasBook(products);
    }

    @Test
    public void testTheresDigitalProductsInTheOrder() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.DIGITAL_VIDEO));
        order.addItem(new Product("Another CD", 10.00, Type.DIGITAL_MUSIC));
        order.addItem(new Product("Another Digital CD", 10.00, Type.DIGITAL_MUSIC));
        ArrayList<Product> products = order.getItems();
        assert order.hasDigitalOrSignature(products);
    }

    @Test
    public void testTheresntDigitalProductsInTheOrder() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.BOOK));
        order.addItem(new Product("Another CD", 10.00, Type.BOOK));
        order.addItem(new Product("Another Digital CD", 10.00, Type.BOOK));
        ArrayList<Product> products = order.getItems();
        assert !order.hasDigitalOrSignature(products);
    }

    @Test
    public void getDigitalProducts() {
        Order order = new Order(foolado, Calendar.getInstance(), "place", "Place", "place");
        order.addItem(new Product("Foo Fighters Wasting Light", 10.00, Type.BOOK));
        order.addItem(new Product("Another CD", 10.00, Type.DIGITAL_MUSIC));
        order.addItem(new Product("Another Digital CD", 10.00, Type.DIGITAL_MUSIC));
        ArrayList<Product> products = order.getItems();
        ArrayList<Product> digitalProducts = order.getDigitalProducts(products);
        assert digitalProducts.size() == 2;
    }
}
