import br.com.store.model.order.Invoice;
import br.com.store.model.product.Membership;
import br.com.store.model.product.Product;
import br.com.store.model.product.Type;
import org.junit.Test;

import java.util.ArrayList;

/**
 * Created by tinguan on 26/03/17.
 */
public class InvoiceTest {

    @Test
    public void testOneMemberShipActivation() {
        Invoice invoice = new Invoice("zpt","xpto");
        ArrayList<Product> products = new ArrayList<Product>();
        products.add(new Product("Foo Fighters Wasting Light", 10.00, Type.BOOK));
        products.add(new Product("Spotify", 10.00, Type.MEMBERSHIP));
        ArrayList<Membership> memberships = invoice.activateMembership(products);
        assert memberships.size() == 1;
    }

    @Test
    public void testTwoMemberShipActivation() {
        Invoice invoice = new Invoice("zpt","xpto");
        ArrayList<Product> products = new ArrayList<Product>();
        products.add(new Product("Netflix", 10.00, Type.MEMBERSHIP));
        products.add(new Product("Spotify", 10.00, Type.MEMBERSHIP));
        ArrayList<Membership> memberships = invoice.activateMembership(products);
        assert memberships.size() == 2;
    }


    @Test
    public void testNoneMemberShipActivation() {
        Invoice invoice = new Invoice("zpt","xpto");
        ArrayList<Product> products = new ArrayList<Product>();
        products.add(new Product("Foo Fighters Wasting Light", 10.00, Type.BOOK));
        products.add(new Product("La la land", 10.00, Type.BOOK));
        ArrayList<Membership> memberships = invoice.activateMembership(products);
        assert memberships.size() == 0;
    }
}
