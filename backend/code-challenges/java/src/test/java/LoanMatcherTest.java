import loan.Customer;
import loan.LoanMatcher;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class LoanMatcherTest {

    @Test
    void returnAllLoansWhenIncomeAbove5000AndBelow30() {
        Customer customer = new Customer(5000, 29, true);
        LoanMatcher loanMatcher = new LoanMatcher(customer);
        List<String> availableLoans = loanMatcher.loans();

        assertThat(availableLoans.size()).isEqualTo(3);
    }
}
