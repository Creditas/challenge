package loan.matchers;

import loan.Customer;

public class CollateralizedMatcher implements Matcher {
    public static String TYPE = "COLLATERIZED_LOAN";

    @Override
    public boolean matches(Customer customer) {
        if (customer.income() <= 3000) {
            return customer.age() < 30 && customer.liveInSp();
        } else if (customer.income() >= 5000) {
            return customer.age() < 30;
        }

        return customer.liveInSp();
    }

    @Override
    public String type() {
        return TYPE;
    }
}
