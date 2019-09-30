package br.com.creditas.factories;

import br.com.creditas.enums.ProductType;
import br.com.creditas.services.BookShippingLabelService;
import br.com.creditas.services.DefaultShippingLabelService;
import br.com.creditas.services.ShippingLabelService;

import static br.com.creditas.enums.ProductType.BOOK;

public class ShippingLabelServiceFactory {
    public static ShippingLabelService getInstance(ProductType productType) {
        return BOOK == productType ? new BookShippingLabelService() : new DefaultShippingLabelService();
    }
}
