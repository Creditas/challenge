package loan.matchers;

import loan.Customer;

public class PayrollMatcher implements Matcher {
    public static String TYPE = "PAYROLL_LOAN";

    @Override
    public boolean matches(Customer customer) {
        return customer.income() >= 5000;
    }

    @Override
    public String type() {
        return TYPE;
    }
}
