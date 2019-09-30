package br.com.creditas.factories;

import br.com.creditas.services.DefaultVoucherService;
import br.com.creditas.services.VoucherService;

public class VoucherServiceFactory {
    public static VoucherService getInstance() {
        return new DefaultVoucherService();
    }
}
