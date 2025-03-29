package loan;

import loan.matchers.CollateralizedMatcher;
import loan.matchers.Matcher;
import loan.matchers.PayrollMatcher;
import loan.matchers.PersonalMatcher;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LoanMatcher {
    private static Matcher[] MATCHERS = new Matcher[]{
            new PayrollMatcher(),
            new CollateralizedMatcher(),
            new PersonalMatcher()
    };

    private Customer customer;

    public LoanMatcher(Customer customer) {
        this.customer = customer;
    }

    public List<String> loans() {
        return Arrays.stream(MATCHERS).filter(m -> m.matches(customer))
                .map(Matcher::type).collect(Collectors.toUnmodifiableList());
    }
}
