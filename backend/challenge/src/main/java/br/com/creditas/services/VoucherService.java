package br.com.creditas.services;

import br.com.creditas.models.Customer;
import br.com.creditas.models.Voucher;

import java.math.BigDecimal;

public interface VoucherService {
    Voucher generate(Customer customer, BigDecimal value);
}
