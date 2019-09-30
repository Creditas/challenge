package br.com.creditas.providers;

import java.math.BigDecimal;

public class BigDecimalProvider {
    public static BigDecimal create(String value) {
        return new BigDecimal(value);
    }
}
