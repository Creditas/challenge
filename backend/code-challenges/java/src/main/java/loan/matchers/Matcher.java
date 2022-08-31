package loan.matchers;

import loan.Customer;
import loan.Loan;

public interface Matcher extends Loan {
    default boolean matches(Customer customer) {
        return true;
    }
}
