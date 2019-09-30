package br.com.creditas.services;

import br.com.creditas.models.Customer;
import br.com.creditas.models.Voucher;

import java.math.BigDecimal;

public class DefaultVoucherService implements VoucherService {
    @Override
    public Voucher generate(Customer customer, BigDecimal value) {
        return new Voucher(customer, value);
    }
}
