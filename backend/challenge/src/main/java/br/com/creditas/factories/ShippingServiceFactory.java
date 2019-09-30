package br.com.creditas.factories;

import br.com.creditas.enums.ProductType;
import br.com.creditas.services.*;

public class ShippingServiceFactory {
    public static ShippingService getInstance(ProductType productType) {
        switch (productType) {
            case PHYSICAL:
                return new PhysicalShippingService(ShippingLabelServiceFactory.getInstance(productType));
            case BOOK:
                return new BookShippingService(ShippingLabelServiceFactory.getInstance(productType));
            case DIGITAL:
                return new DigitalShippingService(EmailServiceFactory.getInstance(productType), VoucherServiceFactory.getInstance());
            default:
                return new MembershipShippingService(MembershipServiceFactory.getInstance(), EmailServiceFactory.getInstance(productType));
        }
    }
}
