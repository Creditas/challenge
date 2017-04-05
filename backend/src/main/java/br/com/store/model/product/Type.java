package br.com.store.model.product;

import br.com.store.model.order.EmailNotification;
import br.com.store.model.order.Order;
import br.com.store.model.order.OrderDescription;
import br.com.store.model.order.ShippingLabel;
import br.com.store.model.payment.Payment;

/**
 * Created by tinguan on 26/03/17.
 */

public enum Type implements ProcessOrderDescription {
    BOOK {
        public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher) {
            ShippingLabel orderDescription = new ShippingLabel(order.getAddress().getZipCode(), order.getAddress());
            orderDescription.setDescription("This item doesn't require taxes");
            return orderDescription;
        }

    }, DIGITAL_MUSIC {
        public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher) {
            EmailNotification orderDescription = new EmailNotification();
            orderDescription.createEmail(order.getDigitalProducts(order.getItems()));
            if(!isUsedVoucher){
                payment.setVoucherValue(10.00);
            }
            return orderDescription;

        }
    }, DIGITAL_VIDEO {
        public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher) {
            EmailNotification orderDescription = new EmailNotification();
            orderDescription.createEmail(order.getDigitalProducts(order.getItems()));
            if(!isUsedVoucher){
                payment.setVoucherValue(10.00);
            }
            return orderDescription;

        }
    }, MEMBERSHIP {
        public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher) {
            // DO NOTHING
            return new OrderDescription();
        }
    },
    REGULAR_ITEM {
        public OrderDescription process(Order order, Payment payment, boolean isUsedVoucher) {
            ShippingLabel orderDescription = new ShippingLabel(order.getAddress().getZipCode(), order.getAddress());
            orderDescription.setDescription("Send it to mail box");
            return orderDescription;
        }
    };
}
