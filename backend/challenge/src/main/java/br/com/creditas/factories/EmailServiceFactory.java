package br.com.creditas.factories;

import br.com.creditas.enums.ProductType;
import br.com.creditas.services.DigitalEmailService;
import br.com.creditas.services.EmailService;
import br.com.creditas.services.MembershipEmailService;

import static br.com.creditas.enums.ProductType.DIGITAL;

public class EmailServiceFactory {
    public static EmailService getInstance(ProductType productType) {
        return DIGITAL == productType ? new DigitalEmailService(): new MembershipEmailService();
    }
}
