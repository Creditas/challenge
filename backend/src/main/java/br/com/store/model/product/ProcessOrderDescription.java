package br.com.store.model.product;

import br.com.store.model.order.Order;
import br.com.store.model.order.OrderDescription;
import br.com.store.model.payment.Payment;

/**
 * Created by tinguan on 05/04/17.
 */
public interface ProcessOrderDescription {

    public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher);


}
