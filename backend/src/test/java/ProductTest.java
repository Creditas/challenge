import br.com.store.model.product.Product;
import br.com.store.model.product.Type;
import org.junit.Test;

/**
 * Created by tinguan on 26/03/17.
 */
public class ProductTest {

    @Test
    public void testDigitalProductType(){
        Product product = new Product("U2", 10.00, Type.DIGITAL_MUSIC);
        assert product.isDigital(product);
    }


    @Test
    public void testProduct(){
        Product product = new Product("Guia do Mochileiro", 10.00, Type.BOOK);
        assert !product.isDigital(product);
    }

}
